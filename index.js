class Node {
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }
}
class Queue{
    constructor(){
        this.obj = {}
        this.rear = 0
        this.front = 0
    }
    enqueue(value){
        
        this.obj[this.rear] = value
        this.rear++
    }
    dequeue(){
        let item = this.obj[this.front]
        delete this.obj[this.front]
        this.front++
        return item
    }
    size(){
        return this.rear - this.front
    }
    isEmpty(){
        return this.size() === 0
    }
}
class BinarySearchTree{
    constructor(arr){
        this.root = this.buildTree(arr)
    }
    buildTree(arr){
        if(arr.length === 0) return null
        arr = [...new Set(arr)].sort((a,b) => a - b)
        return this.buildTreeHelper(arr, 0 ,arr.length - 1)
    }
    buildTreeHelper(arr,start,end){
        if(start>end) return null

        let mid = Math.floor((start+end)/2)
        let node = new Node(arr[mid])

        node.left = this.buildTreeHelper(arr,start,mid - 1)
        node.right = this.buildTreeHelper(arr, mid+1, end)
        return node
    }
    insert(value){
        let newNode = new Node(value)
        if(this.isEmpty()){
            this.root = newNode
        }else{
            this.insertNode(this.root, newNode)
        }
    }
    insertNode(root, node) {
        if (root.value > node.value) {
          if (root.left === null) {
            root.left = node;
          } else {
            this.insertNode(root.left, node);
          }
        } else {
          if (root.right === null) {
            root.right = node;
          } else {
            this.insertNode(root.right, node);
          }
        }
      }
      delete(value){
        return this.deleteNode(this.root, value)
      }
      deleteNode(root, value) {
        if (root === null) return root;
    
        if (root.value > value) {
          root.left = this.deleteNode(root.left, value);
        } else if (root.value < value) {
          root.right = this.deleteNode(root.right, value);
        } else {
          if (!root.left) {
            return root.right;
          } else if (!root.right) {
            return root.left;
          }
          root.value = this.minValue(root.right);
          root.right = this.deleteNode(root.right, root.value);
        }
        return root;
      }
      find(value){
        return this.findNode(this.root,value)
      }
      findNode(root,value){
        if(root === null) return null
        if(root.value === value){
            return root
        }
        if(root.value > value){
            return this.findNode(this.root.left,value)
        }else{
            return this.findNode(this.root.right,value)
        }
        return -1
      }
    preOrder(root){
        if(root){
            console.log(root.value)
            this.preOrder(root.left)
            this.preOrder(root.right)
        }
    }
    inOrder(root,arr){
        if(root){
            this.inOrder(root.left,arr)
            console.log(root.value)
            this.inOrder(root.right,arr)
        }
    }
    postOrder(root){// left,rigt,root
        if(root){
            this.postOrder(root.left)
            this.postOrder(root.right)
            console.log(root.value)
        }
    }
    levelOfOrder(){
        let result = []
        if(!this.root){
            return result
        }
        let queue = new Queue()
        queue.enqueue(this.root)

        while(!queue.isEmpty()){
            let levelSize = queue.size()
            let curr = []
            for(let i = 0; i<levelSize; i++){
                let node = queue.dequeue()
                curr.push(node.value)
                if(node.left !== null){
                    queue.enqueue(node.left)
                }
                if(node.right !==null){
                    queue.enqueue(node.right)
                }
            }
            result.push(curr)
        }
      return result
    }
    height(root){
        if(root ===  null)return -1
        let hl = this.height(root.left)
        let hr = this.height(root.right)

        return Math.max(hl,hr) + 1
    }
    depth(node){
        if(node === null) return -1
        let count = 0
        while (node !== null && node !== this.root) {
            node = this.getParent(node)
            count++
        }
        console.log(count)
        return count
    }
    getParent(node){
        return node.parent
    }
    isBalanced(node){
        if(node === null) return true
        let heightLeft = this.height(node.left)
        let heightRight = this.height(node.right)
        let absValue = Math.abs(heightLeft- heightRight)

        if(absValue > 1){
            return false
        }
        return this.isBalanced(node.left) && this.isBalanced(node.right)
        
    }
    reBalanced(){
        if(this.isBalanced(this.root)){
            console.log('The tree is already balanced')
            return
        }
        let inArr = []
        this.inOrder(this.root,inArr)
        this.root = this.buildTree(inArr)
    }
    min(root) {
        let min = root.value;
        while (root.left !== null) {
          min = root.left.value;
          root = root.left;
        }
        return min;
      }
    isEmpty(){
        return this.root === null
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      }


}
 

const tree = new BinarySearchTree([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]);
//tree.prettyPrint();
tree.insert(7);
//tree.prettyPrint();
// tree.delete(9)
// tree.prettyPrint();

//console.log(tree.find(2))
console.log(tree.levelOfOrder())

console.log(tree.height(tree.root))
tree.depth(tree.root)
console.log(tree.isBalanced(tree.root))
tree.reBalanced()

const unbalancedTree = new BinarySearchTree([]);
unbalancedTree.insert(10);
unbalancedTree.insert(20);
unbalancedTree.insert(30);
unbalancedTree.insert(40);
unbalancedTree.insert(50);
unbalancedTree.prettyPrint();

console.log(unbalancedTree.isBalanced(unbalancedTree.root));  // Should return false
unbalancedTree.reBalanced();
unbalancedTree.prettyPrint();


