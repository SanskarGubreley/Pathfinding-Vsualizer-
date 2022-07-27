import React, { Component ,useState} from "react";
import Node from "./Node/Node";
import "./PathfindingVisualizer.css";
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/djikstra";
import backgroundColor from  '../index.css';


const START_NODE_ROW = 10;
const START_NODE_COL = 8;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 50;



export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  
  // changeTheme(){
  //   if(backgroundColor ==='white'){
  //     backgroundColor='pink'
  //   }else{
  //     backgroundColor='white'
  //   }
  // }
  

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
      


<nav class="navbar navbar-expand-lg  navbar-dark bg-dark ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">PathFinding Visualizer! by Sanskar Gubreley</a>
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">


        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Pick the algorithm 
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" onClick={() => this.visualizeDijkstra()} href="#">Dijkstra's Algorithm</a></li>
            <li><a class="dropdown-item" onClick={() => this.visualizeDijkstra()} href="#">Breadth First Search</a></li>
            <li><a class="dropdown-item" onClick={() => this.visualizeDijkstra()} href="#">Depth First Search</a></li>
            
          </ul>
        </li>
        
        
        
      </ul>
    </div>
  </div>
</nav>

<div id="mainText">
  <ul>
    <li>
      <div className="circle"></div>
    </li>
    <li>
      <div className="start">-"Start Node"</div>
    </li>
    <li>
      <div className="triangle"></div>
    </li>
    <li>
      <div className="end">-"End Node"</div>
    </li>
    <li>
      <div className="visitednode"></div>
    </li>
    <li>
      <div className="visitednode2"></div>
    </li>
    <li>
      <div className="visitednode3"></div>
    </li>
    <li>
      <div className="visited">-"Visted Nodes"</div>
    </li>
    <li>
      <div className="wallnode"></div>
    </li>
    <li>
      <div className="wall">-"Wall Node"</div>
    </li>
    <li>
      <div className="unvisitednode"></div>
    </li>
    <li>
      <div className="unvisit">-"Unvisited Node"</div>
    </li>
    <li>
      <div className="shortestnode"></div>
    </li>
    <li>
      <div className="visited">-"Shortest Path Node"</div>
    </li>
  </ul>
</div>
<div className="temp2">

<h4>Pick any algorithm and visualize it!</h4>
<p>You can create walls by clicking on unvisited nodes</p>
</div>
        
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 21; row++) {
    const currentRow = [];
    for (let col = 0; col < 68; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
