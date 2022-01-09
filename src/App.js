import "./style/mainStyle.css";
import React, { useRef, useState, useEffect } from "react";
import Mode from "./Components/Mode";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [tasks, setTasks] = useState(() => {
    const localData = localStorage.getItem("to-do-list");
    return localData ? JSON.parse(localData) : [];
  });

  const [tasksTab, setTasksTab] = useState("all");
  const [inputText, setInputText] = useState("");

  const [itemsLeft, setItemsLeft] = useState();

  const inputTextRef = useRef(null);

  const fillInput = (e) => {
    setInputText(e.target.value);
  };

  const addTask = () => {
    if (inputText) {
      let to_do_list = JSON.parse(localStorage.getItem("to-do-list"));
      to_do_list.push({ value: inputText, active: true, key: Date.now() });
      setTasks(to_do_list);
      setInputText("");
      localStorage.setItem("to-do-list", JSON.stringify(to_do_list));
    }
  };

  const toBeCompleted = (itemKey) => {
    let to_do_list = JSON.parse(localStorage.getItem("to-do-list"));
    let to_do_list_two = to_do_list.map((item) => {
      if (item.key === itemKey) {
        item.active = !item.active;
        return item;
      } else {
        return item;
      }
    });
    localStorage.setItem("to-do-list", JSON.stringify(to_do_list_two));
    setTasks(to_do_list_two);
  };

  useEffect(() => {
    if (!localStorage.getItem("to-do-list")) {
      localStorage.setItem("to-do-list", JSON.stringify([]));
    }
    setItemsLeft(
      tasks.filter((e) => {
        return e.active === true;
      }).length
    );
  }, [tasks]);

  const clearCompleted = () => {
    let to_do_list = JSON.parse(localStorage.getItem("to-do-list"));
    let to_do_list_clear = to_do_list.filter((items) => items.active);
    localStorage.setItem("to-do-list", JSON.stringify(to_do_list_clear));
    setTasks(to_do_list_clear);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) {
      return;
    } else {
      let items = Array.from(tasks);
      const [reOrdered] = items.splice(result.source.index, 1);

      items.splice(result.destination.index, 0, reOrdered);

      localStorage.setItem("to-do-list", JSON.stringify(items));
      setTasks(items);
    }
  }

  const deleteOne = (itemKey) => {
    let to_do_list = JSON.parse(localStorage.getItem("to-do-list"));
    let to_do_list_clear = to_do_list.filter((items) => items.key !== itemKey);

    localStorage.setItem("to-do-list", JSON.stringify(to_do_list_clear));
    setTasks(to_do_list_clear);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {/* task input  */}
      <section>
        <div className="to-do-container ">
          <Mode />

          <div className="task-con flex ai-c p-1 mb-2 br">
            <div className="circle mr-1 c-p" onClick={() => addTask()}></div>
            <input
              type="text"
              onChange={(e) => fillInput(e)}
              value={inputText}
              ref={inputTextRef}
              onKeyUp={(e) => {
                if (e.keyCode == 13) {
                  addTask();
                }
              }}
            />
          </div>

          {/* list  */}
          <Droppable droppableId="tasks">
            {(provided, snapshot) => (
              <div
                className="tasksContainer"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasksTab === "all"
                  ? tasks.map((tasks, index) => {
                      const { value, active, key } = tasks;
                      return (
                        <Draggable
                          key={tasks.key}
                          draggableId={String(key)}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <Tasks
                              value={value}
                              active={active}
                              itemKey={key}
                              toBeCompleted={toBeCompleted}
                              tasksTab={tasksTab}
                              provided={provided}
                              deleteOne={deleteOne}
                            />
                          )}
                        </Draggable>
                      );
                    })
                  : tasksTab === "active"
                  ? tasks
                      .filter((tasks) => tasks.active)
                      .map((tasks, index) => {
                        const { value, active, key } = tasks;
                        return (
                          <Draggable
                            key={tasks.key}
                            draggableId={String(key)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Tasks
                                value={value}
                                active={active}
                                itemKey={key}
                                toBeCompleted={toBeCompleted}
                                tasksTab={tasksTab}
                                provided={provided}
                                deleteOne={deleteOne}
                              />
                            )}
                          </Draggable>
                        );
                      })
                  : tasks
                      .filter((tasks) => !tasks.active)
                      .map((tasks, index) => {
                        const { value, active, key } = tasks;
                        return (
                          <Draggable
                            key={tasks.key}
                            draggableId={String(key)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <Tasks
                                value={value}
                                active={active}
                                itemKey={key}
                                toBeCompleted={toBeCompleted}
                                tasksTab={tasksTab}
                                provided={provided}
                                deleteOne={deleteOne}
                              />
                            )}
                          </Draggable>
                        );
                      })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* container bottom  */}
          <div className="flex jc-sb small-text taskCon2 p-1">
            <div>{itemsLeft} items left</div>
            <div className="filterCon flex gap-1 c-p">
              <div
                className={tasksTab === "all" ? "clicked" : ""}
                onClick={() => setTasksTab("all")}
              >
                All
              </div>
              <div
                className={tasksTab === "active" ? "clicked" : ""}
                onClick={() => setTasksTab("active")}
              >
                Active
              </div>
              <div
                className={tasksTab === "completed" ? "clicked" : ""}
                onClick={() => setTasksTab("completed")}
              >
                Completed
              </div>
            </div>
            <div className="c-p" onClick={() => clearCompleted()}>
              Clear Completed
            </div>
          </div>

          {/* container bootom for phone  */}
          <div className="filterCon2 flex jc-sb small-text gap-1 c-p">
            <div
              className={tasksTab === "all" ? "clicked" : ""}
              onClick={() => setTasksTab("all")}
            >
              All
            </div>
            <div
              className={tasksTab === "active" ? "clicked" : ""}
              onClick={() => setTasksTab("active")}
            >
              Active
            </div>
            <div
              className={tasksTab === "completed" ? "clicked" : ""}
              onClick={() => setTasksTab("completed")}
            >
              Completed
            </div>
          </div>
          <h6 className="mt-4 text-c">Drag and drop to reorder list</h6>
        </div>
      </section>
    </DragDropContext>
  );
}

const Tasks = (props) => {
  const { value, active, itemKey, provided } = props;
  return (
    <div
      className="taskCon2 flex ai-c p-1 br c-p"
      onClick={() => props.toBeCompleted(itemKey)}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      <div className={`circle mr-1 ${!active ? "completedCircle" : ""}`}>
        <div></div>
      </div>
      <p className={!active ? "completed" : ""}>{value}</p>
      <div className="delete" onClick={() => props.deleteOne(itemKey)}></div>
    </div>
  );
};

export default App;
