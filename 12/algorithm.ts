class Node {
  public value: number
  public type: 'normal' | 'start' | 'end'
  public adjacents: Node[] = []

  constructor(public x: number, public y: number, private char: string) {
    if (char === 'S') {
      this.type = 'start'
      this.value = 0
    } else if (char === 'E') {
      this.type = 'end'
      this.value = 'z'.charCodeAt(0) - 'a'.charCodeAt(0)
    } else {
      this.type = 'normal'
      this.value = char.charCodeAt(0) - 'a'.charCodeAt(0)
    }
  }

  get key() {
    return Node.getKey(this.x, this.y)
  }

  static getKey(x: number, y: number) {
    return `${x},${y}`
  }

  addAdjacent(node: Node): void {
    this.adjacents.push(node)
  }
}

class Matrix {
  private nodeStart: Node = new Node(0, 0, '')
  private nodeEnd: Node = new Node(0, 0, '')
  private nodes: Map<string, Node>
  private width: number
  private height: number

  constructor(data: string[][], start: string | undefined = undefined) {
    this.nodes = new Map<string, Node>()
    this.width = data[0].length
    this.height = data.length

    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        const node = new Node(x, y, data[y][x])
        if (node.type === 'start') {
          this.nodeStart = node
        } else if (node.type === 'end') {
          this.nodeEnd = node
        }

        this.nodes.set(node.key, node)

        if (node.key === start) this.nodeStart = node
      }
    }

    for (const node of [...this.nodes.values()]) {
      for (const [offsetX, offsetY] of [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
      ]) {
        const nextX = node.x + offsetX
        const nextY = node.y + offsetY

        if (
          nextX < 0 ||
          nextX >= this.width ||
          nextY < 0 ||
          nextY >= this.height
        )
          continue

        const nextNode = this.nodes.get(Node.getKey(nextX, nextY)) as Node

        if (node.value >= nextNode.value - 1) {
          node.addAdjacent(nextNode)
        }
      }
    }
  }

  getNodesByValue(value: number): Node[] {
    return [...this.nodes.values()].filter((node) => node.value === value)
  }

  bfs(nodeStart: Node | undefined = this.nodeStart): number {
    const visited = new Set<Node>()
    const queue: [Node, number][] = [[nodeStart, 0]]

    while (queue.length > 0) {
      const [node, movements] = queue.shift() as [Node, number]

      for (const nextNode of node.adjacents) {
        if (nextNode === this.nodeEnd) {
          return movements + 1
        }

        if (!visited.has(nextNode)) {
          visited.add(nextNode)
          queue.push([nextNode, movements + 1])
        }
      }
    }

    return 0
  }
}

export default (data: string[][]): { part1: number; part2: number } => {
  const matrix = new Matrix(data)

  return {
    part1: matrix.bfs(),
    part2: matrix
      .getNodesByValue(0)
      .map((node) => matrix.bfs(node))
      .filter((result) => result > 0)
      .sort((a, b) => a - b)[0],
  }
}
