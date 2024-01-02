import { Component, OnInit } from '@angular/core';

interface TreeNode {
  title: string;
  children: TreeNode[];
}

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.scss']
})
export class SecondComponent implements OnInit {

  treeData: TreeNode[] = [
    {
        title: 'root',
        children: [
            {
                title: 'child1',
                children: [
                    {
                        title: 'grandchild1',
                        children: []
                    },
                    {
                        title: 'grandchild2',
                        children: []
                    }
                ]
            },
            {
                title: 'child2',
                children: []
            }
        ]
    },
  ];
  nodeToSwitch: TreeNode | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  addChild(node: TreeNode) {
    const newNodeTitle = prompt('Enter the name for the new node:');
    if (newNodeTitle) {
      node.children.push({
        title: newNodeTitle,
        children: []
      });
    }
  }

  switch(node: TreeNode) {
    if (!this.nodeToSwitch) {
      this.nodeToSwitch = node;
      return;
    }
    this.switchPlaces(this.nodeToSwitch, node);
    this.nodeToSwitch = undefined;
  }

  delete(node: TreeNode) {
    const parent = this.getParent(this.treeData, node);
    if (!parent) {
      if (node === this.treeData[0]) {
        const index = this.treeData.findIndex(treeNode => treeNode === node);
        if (index !== -1) {
          this.treeData.splice(index, 1);
        }
      }
      return;
    }
    parent.children = parent.children.filter(child => child !== node);
  }

  deleteParent(node: TreeNode) {
    const parent = this.getParent(this.treeData, node);
    if (!parent) {
      return;
    }
    const grandparent = this.getParent(this.treeData, parent);
    if (!grandparent) {
      const index = this.treeData.findIndex(treeNode => treeNode === parent);
      if (index !== -1) {
        this.treeData.splice(index, 1);
      }
      return;
    }
    grandparent.children = grandparent.children.filter(child => child !== parent);
  }

  getParent(tree: TreeNode[], node: TreeNode): TreeNode | undefined {
    for (const treeNode of tree) {
      if (treeNode.children.includes(node)) {
        return treeNode;
      }
      const parent = this.getParent(treeNode.children, node);
      if (parent) {
        return parent;
      }
    }
    return undefined;
  }

  // not working when switching parent with child
  switchPlaces(node1: TreeNode, node2: TreeNode) {
    const parent1 = this.getParent(this.treeData, node1);
    const parent2 = this.getParent(this.treeData, node2);
    if (!parent1 || !parent2) {
      return;
    }
    const index1 = parent1.children.findIndex(child => child === node1);
    const index2 = parent2.children.findIndex(child => child === node2);
    if (index1 === -1 || index2 === -1) {
      return;
    }
    parent1.children[index1] = node2;
    parent2.children[index2] = node1;
  }

  duplicateLeafNodes() {
    const leafNodes = this.getLeafNodes(this.treeData);
    for (const leafNode of leafNodes) {
      const parent = this.getParent(this.treeData, leafNode);
      if (!parent) {
        continue;
      }
      parent.children.push({
        title: leafNode.title,
        children: []
      });
    }
  }

  getLeafNodes(tree: TreeNode[]): TreeNode[] {
    let leafNodes: TreeNode[] = [];
    for (const treeNode of tree) {
      if (treeNode.children.length === 0) {
        leafNodes.push(treeNode);
      }
      leafNodes = leafNodes.concat(this.getLeafNodes(treeNode.children));
    }
    return leafNodes;
  }

  deleteDuplicateNodes() {
    const duplicateNodes = this.getDuplicateNodes(this.treeData);
    for (const duplicateNode of duplicateNodes) {
      const parent = this.getParent(this.treeData, duplicateNode);
      if (!parent) {
        continue;
      }
      parent.children = parent.children.filter(child => child !== duplicateNode);
    }
  }

  // not working when root -> a and root -> b -> a
  getDuplicateNodes(tree: TreeNode[]): TreeNode[] {
    let duplicateNodes: TreeNode[] = [];
    for (const treeNode of tree) {
      const duplicateNode = tree.find(node => node.title === treeNode.title && node !== treeNode);
      if (duplicateNode) {
        duplicateNodes.push(duplicateNode);
      }
      duplicateNodes = duplicateNodes.concat(this.getDuplicateNodes(treeNode.children));
    }
    return duplicateNodes;
  }

}
