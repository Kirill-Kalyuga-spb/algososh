import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import style from './stack-page.module.css'
import { ElementStates } from "../../types/element-states";
import sleep from "../../utils/sleep";
import {stack as stackExemplar} from './Stack'

const time = 500

export const StackPage: React.FC = () => {
  const [value, setValue] = useState('')
  const [loader, setLoader] = useState({name: 'default', loading: false})
  const [stack, setStack] = useState<Array<string>>([])
  const [lastIndex, setLastIndex] = useState(0)

  const addElement = async () => {
    setLoader({ name: 'add', loading: true})
    stackExemplar.push(value)
    setValue('')
    setStack([...stackExemplar.getStack()])
    await sleep(time)
    setLastIndex(lastIndex + 1)
    setLoader({ ...loader})
  }

  const deleteElement = async () => {
    setLoader({ name: 'delete', loading: true})
    setLastIndex(lastIndex - 1)
    await sleep(time)
    stackExemplar.pop()
    setStack([...stackExemplar.getStack()])
    setLoader({ ...loader})
  }

  const clearStack = () => {
    stackExemplar.clear()
    setStack([])
    setLastIndex(0)
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <SolutionLayout title="Стек">
      <div className={style.form}>
        <Input
          maxLength={4}
          isLimitText
          onChange={onChange}
          value={value}
          data-testid="input"
        />
        <Button
          text="Добавить"
          type="button"
          disabled={!value || loader.loading || stack.length > 19}
          onClick={addElement}
          isLoader={loader.loading && loader.name === 'add'}
          data-testid="submit"
        />
        <Button
          text="Удалить"
          type="button"
          disabled={!stack.length || loader.loading}
          onClick={deleteElement}
          isLoader={loader.loading && loader.name === 'delete'}
          data-testid="delete"
        />
        <Button
          text="Очистить"
          type="button"
          disabled={!stack.length || loader.loading}
          extraClass={style.button}
          onClick={clearStack}
          data-testid="clear"
        />
      </div>
      <ul className={style.symbolList}>
        {stack?.map((item, index) => {
          return (
            <Circle
              key={nanoid()}
              index={index}
              letter={item}
              state={
                index === lastIndex
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
              head={stack.length - 1 === index ? "top" : ""}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};