import SingleListNode from "./SingleListNode";
import List from "./ListInterface"

export default class SinglyLinkedList implements List{
    private head: SingleListNode | null
    private tail: SingleListNode | null
    private size: number

    constructor(){
        this.head = null
        this.tail = null
        this.size = 0
    }

    getSize = (): number =>{
        return this.size
    }

    addToFrontOfTheList = (value: any): void =>{
        const node: SingleListNode = new SingleListNode(value);

        if(this.head){
            node.next = this.head 
            this.head = node
            this.size ++
        }
        else{
            this.head = node
            this.tail = node
            this.size++
        }
    }

    addToBackOfTheList = (value: any): void => {
        const node = new SingleListNode(value)
        if(this.tail){
            this.tail.next = node
            this.tail = node
            this.size ++
        }
        else{
            this.head = node 
            this.tail = node
            this.size ++
        }
    }

    removeFirstNode = (): SingleListNode => {
        if(this.size === 0){
            throw new Error("Can not remove first node, list is currently empty")
        }
        else if(this.size === 1){
            const node: SingleListNode = this.head

            this.head = null
            this.tail = null
            this.size--

            return node
        }
        else{
            const node: SingleListNode = this.head 

            this.head = this.head.next
            node.next = null
            this.size--
    
            return node
        }
    }

    removeLastNode = (): SingleListNode => {
        if(this.size === 0){
            throw new Error("Can not remove last node, list is currently empty")
        }
        else if(this.size === 1){
            const node: SingleListNode = this.head

            this.head = null
            this.tail = null
            this.size --

            return node
        }
        else{
            let oldTail: SingleListNode = this.head.next
            let newTail: SingleListNode = this.head

            while(oldTail.next != null){
                newTail = oldTail
                oldTail = oldTail.next
            }

            this.tail = newTail
            newTail.next = null
            this.size --

            return oldTail
        }
    }

    getFirstNode = (): SingleListNode => {
        return this.head
    }

    getLastNode = (): SingleListNode => {
        return this.tail
    }

    getNodeAtIndex = (index: number): SingleListNode => {

        this._validateNumberParam(index)

        if(index === 0){
            return this.head
        }
        else if(index === this.size-1){
            return this.tail
        }
        else {
            let node = this.head.next
            
            for(let i = 1;i<index;i++){
                node = node.next
            }
            return node
        }
    }

    removeNodeAtIndex = (index: number): SingleListNode =>{

        this._validateNumberParam(index)

        if(index == 0 ){
            this.removeFirstNode()
        }
        else if(index === this.size -1){
            this.removeLastNode()
        }
        else{
            let nodeToRemove: SingleListNode = this.head.next
            let prevNode: SingleListNode = this.head
            
            for(let i: number = 1;i == index;i++){
                prevNode = nodeToRemove
                nodeToRemove = prevNode.next
            }
            prevNode.next = nodeToRemove.next
            this.size--
            nodeToRemove.next = null

            return nodeToRemove
        }
    }

    insertNodeAtIndex = (index: number,value: any): void => {

        this._validateNumberParam(index)

        if(index === 0){
            this.addToFrontOfTheList(value)
        }
        else if(index === this.size){
            this.addToBackOfTheList(value)
        }
        else{
            // 0 -> 1 -> 2 -> 3 
            const node = new SingleListNode(value)
            let before: SingleListNode = this.head
            let after: SingleListNode = this.head.next

            for(let i = 1; i<index;i++){
                before = before.next
                after = after.next
            }
            before.next = node
            node.next = after
            this.size ++
        }
    }
    printList = (): void => {
        let node = this.head
        for(let i = 0;i<this.size;i++){
            console.log(`index: ${i}`, node)
            node = node.next
        }
    }

    _validateNumberParam = (number: number): void => {
        if(number < 0){
            throw new RangeError("Parameter can not be a negative number")
        }
        // value isn't a number
        if(typeof number !== "number"){
            throw new TypeError("Parameter must be a number")
        }
        // value wasnt passed
        if(number == null){
            throw new Error("Parameter can not be empty")
        }
        // value exceeds size
        if(number > this.size-1){
            throw new RangeError("value paramater exceeds list length")
        }
    }
}