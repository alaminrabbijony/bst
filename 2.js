class Node{
    constructor(value){
        this.value = value
        this.left = null
        this.right = null
    }
}

class Queue {// first in first out
    constructor(){
        this.obj = {}
        this.rear = 0
        this.front = 0
    }
    enqueue(value){// add to last
        this.obj[this.rear] = value
        this.rear++
    }
    dequeue(){// first out
      let item = this.obj[this.front]
      delete this.obj[this.front]
      this.front++
      return item
    }
    size(){
        return this.rear - this.front
    }
    isEmoty(){
        return this.size() === 0
    }
}

class Tree {
    constructor(arr){
        this.data = this.buildTree(arr)
    }
    buildTree(arr){
        if(arr.length === 0 ) return null
        arr = [...new Set(arr)].sort((a,b)=> a-b)
        return this.buildTreeHelper(arr,0,arr.length - 1)
    }
    buildTreeHelper(arr,start,end){
        if(start>end)return null
        let mid = Math.floor((start+end)/2)
        let node = new Node(arr[mid])
        node.left = this.buildTreeHelper(arr,start,mid -1)
        node.right = this.buildTreeHelper(arr,mid+1,end)
        return node
    }
    insert(value){
        let node = new Node(value)
        if(this.isEmoty()){
             return this.data = node
        }else{
            this.insertNode(this.data,node)
        }
    }
    insertNode(data,node){
        if(data.value === node.value){
            console.log(`${node.value} exists. So It cant be inserted`)
            return
        }else if(data.value>node.value){
            if(data.left === null) return data.left = node
            return this.insertNode(data.left,node)
        }else if(data.value<node.value){
            if(data.right === null) return data.right = node
            return this.insertNode(data.right,node)
        }
    }
    delete(value){
        return this.deleteNode(this.data, value)
    }
    deleteNode(data,node){
        if(data === null) return data
        if(data.value > node){
            data.left =  this.deleteNode(data.left, node)
        }else if(data.value<node){
            data.right = this.deleteNode(data.right, node)
        }else{
            if(!data.left){
                return data.right
            }else if(data.right){
                return data.left
            }
            data.value = this.min(data.left)
            data.right = this.deleteNode(data.right, node)
        }
        return data
    }
    find(value){
        return this.findNode(this.data, value)
    }
    findNode(data, value){
        if(data ===  null) return null
        if(data.value === value) return data
        if(data.value > value) return this.findNode(data.left, value)
            if(data.value < value) return this.findNode(data.right, value)
    }
    levelOfOrder(){
        let result = []
        if(!this.data) return result
        let queue = new Queue()
        queue.enqueue(this.data)
        while(!queue.isEmoty()){
            let curr = []
            for (let i = 0; i < queue.size(); i++) {
                let node = queue.dequeue()
                curr.push(node.value)
                if(node.left !== null){ queue.enqueue(node.left)}
                if(node.right !== null){ queue.enqueue(node.right)}            
            }
            result.push(curr)
        }
        return result
    }
    preOrder(data,arr){
        if(data){
            console.log(data.value)
            this.preOrder(data.left, arr)
            this.preOrder(data.right, arr)
        }
    }
    inOrder(data,arr){
        if(data){
            this.inOrder(data.left, arr)
            console.log(data.value)
            this.inOrder(data.right, arr)
        }
    }
    height(data){
        if(data === null) return -1
        let h1 = this.height(data.left)
        let h2 = this.height(data.right)
        return Math.max(h1,h2)+1
    }
    depth(node){
        if(node === null) return -1
        let count = 0
        while(node!== null && node !== this.data){
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
        let h1= this.height(node.left)
        let h2 = this.height(node.right)
        let abs = Math.abs(h1 - h2)
        if(abs>1) return false
        return this.isBalanced(node.left) && this.isBalanced(node.right)
    }
    reBalanced(){
        if(this.isBalanced()){
            console.log(`the tree is balanced`)
            return
        }
        let inArr = []
        this.inOrder(this.data,inArr)
        this.data = this.buildTree(inArr)
    }
    min(data){
        let min = data.value
        while (data.left !== null) {
            min = data.left.value
            data = data.left
        }
        return min
    }
    isEmoty(){
        return this.data === null
    }
    prettyPrint(node = this.data, prefix = "", isLeft = true) {
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
 

const tree = new Tree([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]);
tree.insert(7)
//tree.insert(4)
tree.delete(4)
tree.prettyPrint()
console.log(tree.levelOfOrder())
//console.log(tree.inOrder(this.data))
//tree.inOrder(tree.data)
//tree.preOrder(tree.data)
//console.log(tree.find(7))
console.log(tree.height(tree.data))
//tree.depth(this.data)
console.log(tree.isBalanced(tree.data))
