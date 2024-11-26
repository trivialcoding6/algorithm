class Stack<T> {
  private items: T[] = [];

  push(element: T): void {
    this.items.push(element);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

class StackQueue<T> {
  private inStack: Stack<T>;
  private outStack: Stack<T>;

  constructor() {
    this.inStack = new Stack<T>();
    this.outStack = new Stack<T>();
  }

  enqueue(element: T): void {
    this.inStack.push(element);
  }

  private moveElements(): void {
    if (this.outStack.isEmpty()) {
      while (!this.inStack.isEmpty()) {
        const element = this.inStack.pop();
        if (element) {
          this.outStack.push(element);
        }
      }
    }
  }

  dequeue(): T | undefined {
    this.moveElements();
    return this.outStack.pop();
  }

  isEmpty(): boolean {
    return this.inStack.isEmpty() && this.outStack.isEmpty();
  }

  size(): number {
    return this.inStack.size() + this.outStack.size();
  }
}

export { StackQueue };
