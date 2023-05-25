import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import style from './sorting-page.module.css'
import { nanoid } from "nanoid";
import { Column } from "../ui/column/column";
import sleep from "../../utils/sleep";
import { ElementStates, TSorting } from "../../types/element-states";
import { Direction } from "../../types/direction";

const time = 100 //ms

export const SortingPage: React.FC = () => {
  const [value, setValue] = useState('choice')
  const [loader, setLoader] = useState({name: 'default', loading: false})
  const [arr, setArr] = useState<Array<TSorting>>([])
  const { length } = arr;

  const randomArr = () => {
    const max = 17
    const min = 3
    const lengthArr = Math.floor(Math.random() * (max - min + 1) + min)
    const array: TSorting[] = []
    for(let i = 0; i < lengthArr; i++ ) {
      const maxNum = 100
      let randomNum = Math.floor(Math.random() * (maxNum + 1))
      for(let j = 0; j < array.length; j++ ) {
        if(randomNum === array[j].index) {
          array.splice(j, 1)
        }
      }
      array.push({index: randomNum, state: ElementStates.Default})
    }
    setArr(array)
  }

  const reset = () => {
    for (let i = 0; i < arr?.length; i++) {
      arr[i].state = ElementStates.Default
    }
    setArr([...arr])
  }

  const swap = (arr: TSorting[], i: number, l: number) => {
    return [arr[i], arr[l]] = [arr[l], arr[i]]
  }

  const choice = async (name: string) => {
    for (let i = 0; i < length; i++) {

      for (let j = i; j < length; j++) {
        arr[i].state = ElementStates.Changing
        arr[j].state = ElementStates.Changing
        setArr([...arr])
        await sleep(time)
        if (name === 'increase') {
          if (arr[i].index > arr[j].index) { swap(arr, i, j) }
        }
        if (name === 'decrease') {
          if (arr[i].index < arr[j].index) { swap(arr, i, j) }
        }
        arr[i].state = ElementStates.Default
        arr[j].state = ElementStates.Default
      }

      arr[i].state = ElementStates.Modified
      setArr([...arr])
    }
  }

  const bubble = async (name: string) => {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].state = ElementStates.Changing
        arr[j + 1].state = ElementStates.Changing
        setArr([...arr])
        await sleep(time)
        if (name === 'increase') {
          if (arr[j].index > arr[j + 1].index) { swap(arr, j, j + 1) }
        }
        if (name === 'decrease') {
          if (arr[j].index < arr[j + 1].index) { swap(arr, j, j + 1) }
        }
        arr[j].state = ElementStates.Default
        arr[j + 1].state = ElementStates.Default
      }
      arr[length - i - 1].state = ElementStates.Modified
      setArr([...arr])
    }
  }

  const decrease = async () => {
    const type = 'decrease'
    setLoader({ name: type, loading: true })
    reset()
    
    if (value === 'choice') {
      await choice(type)
    } else {
      await bubble(type)
    }
    
    setLoader({ ...loader })
  }

  const increase = (async () => {
    const type = 'increase'
    setLoader({name: type, loading: true})
    reset()

    if (value === 'choice') {
      await choice(type)
    } else {
      await bubble(type)
    }

    setLoader({...loader})
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.form}>
        <div className={style.radioInputs}>
          <RadioInput
            label="Выбор"
            name="sort"
            onChange={onChange}
            value='choice'
            defaultChecked
            disabled={loader.loading}
          />
          <RadioInput
            label="Пузырёк"
            name="sort"
            onChange={onChange}
            value='bubble'
            disabled={loader.loading}
          />
        </div>
        <Button
          text="По возрастанию"
          isLoader={loader.loading && loader.name === 'increase'}
          onClick={increase}
          disabled={!arr || (loader.name !== 'increase' && loader.loading)}
          sorting={Direction.Ascending}
          extraClass={style.button}
        />
        <Button
          text="По убыванию"
          isLoader={loader.loading && loader.name === 'decrease'}
          onClick={decrease}
          disabled={!arr || (loader.name !== 'decrease' && loader.loading)}
          sorting={Direction.Descending}
          extraClass={style.button}
        />
        <Button
          text="Новый массив"
          onClick={randomArr}
          disabled={loader.loading}
          extraClass={style.buttonArr}
        />
      </div>
      <div className={style.chart} >
        {arr?.map((item) => (
          <Column key={nanoid()} index={item.index} state={item.state}/>
        ))}
      </div>
    </SolutionLayout>
  );
};