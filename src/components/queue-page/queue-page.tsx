import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import style from '../stack-page/stack-page.module.css'
import { ElementStates } from "../../types/element-states";
import sleep from "../../utils/sleep";

const time = 1000
const size = 7
const emptyArr = ['', '', '', '', '', '', '']

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState('')
  const [loader, setLoader] = useState({name: 'default', loading: false})

  const [lastElem, setLastElem] = useState(false)
  const [firstElem, setFirstElem] = useState(false)

  const [queue, setQueue] = useState<Array<string>>(emptyArr)

  const [head, setHead] = useState(0)
  const [tail, setTail] = useState(0)
  const [length, setLength] = useState(0)

  const state = (index: number) => {
    if(tail === index && lastElem) {
      return ElementStates.Changing
    }
    if(head === index && firstElem) {
      return ElementStates.Changing
    }
    return ElementStates.Default
  }

  const enqueue = (item: string) => {
    queue[tail] = item
    if (tail === size - 1) { setTail(0) }
    else { setTail(tail + 1) }
    setLength(length + 1)
  }
  const dequeue = () => {
    if (length !== 0) {
      queue[head] = ''
      if (head === size - 1) {setHead(0)}
      else {setHead(head + 1)}
      setLength(length - 1)
    }
    if(length - 1 === 0) {
      setHead(0)
      setTail(0)
    }
  }

  const addElement = async () => {
    setLoader({ name: 'add', loading: true})
    setLastElem(true)
    await sleep(time)

    enqueue(value)
    setQueue([...queue])
    
    setValue('')
    setLoader({ ...loader})
    setLastElem(false)
  }

  const deleteElement = async () => {
    setLoader({ name: 'delete', loading: true})
    setFirstElem(true)
    await sleep(time)

    dequeue()
    setQueue([...queue]) 

    setLoader({ ...loader})
    setFirstElem(false)
  }

  const clearStack = () => {
    setQueue(['', '', '', '', '', '', ''])
    setHead(0)
    setTail(0)
    setLength(0)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={style.form}>
        <Input
          maxLength={4}
          isLimitText
          onChange={onChange}
          value={value}
        />
        <Button
          text="Добавить"
          type="button"
          disabled={!value || loader.loading || length > size - 1}
          onClick={addElement}
          isLoader={loader.loading && loader.name === 'add'}
        />
        <Button
          text="Удалить"
          type="button"
          disabled={!length || loader.loading}
          onClick={deleteElement}
          isLoader={loader.loading && loader.name === 'delete'}
        />
        <Button
          text="Очистить"
          type="button"
          disabled={!length || loader.loading}
          extraClass={style.button}
          onClick={clearStack}
        />
      </div>
      <ul className={style.symbolList}>
        {queue?.map((item, index) => {
          return (
            <Circle
              key={nanoid()}
              index={index}
              letter={item}
              state={state(index)}
              head={index === head && length !== 0 ? "head" : ""}
              tail={((index === tail - 1) || (tail === 0 && index === size - 1)) && length !== 0 ? "tail" : ""}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
