import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import style from './string.module.css'
import sleep from "../../utils/sleep";
import { Circle } from "../ui/circle/circle";
import { nanoid } from "nanoid";
import { ElementStates, TString } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

export const StringComponent: React.FC = () => {
  const [value, setValue] = useState('')
  const [loader, setLoader] = useState(false)
  const [arr, setArr] = useState<Array<TString>>()

  const swap = (arr: TString[], i: number, l: number) => {
    return [arr[i], arr[l]] = [arr[l], arr[i]]
  }

  const sort = async () => {
    const array = value.split('').map((item: string) => {
      return { letter: item, state: ElementStates.Default }
    })
    setArr(array);
    const end = array.length - 1
    const middle = Math.ceil(array.length / 2) + 1
   
    for (let i = 0; i < middle - 1; i++) {
      let l = end - i

      if (i !== l) {
        array[i].state = ElementStates.Changing
        array[l].state = ElementStates.Changing
        setArr([...array]);
        await sleep(DELAY_IN_MS)
      }

      swap(array, i, l)
      
      array[i].state = ElementStates.Modified
      array[l].state = ElementStates.Modified

      setArr([...array]);
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true)
    
    await sort()
    
    setLoader(false)
    setValue('')
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }


  return (
    <SolutionLayout title="Строка">
     <form className={style.form} onSubmit={onSubmit}>
        <Input
          maxLength={11}
          isLimitText
          onChange={onChange}
          value={value}
        />
        <Button
          text="Развернуть"
          isLoader={loader}
          type="submit"
          disabled={!value}
          data-testid='submit'
        />
      </form>
      <ul className={style.symbolList} data-testid='list'>
        {arr?.map((item) => (
          <Circle key={nanoid()} letter={item.letter} state={item.state} />
        ))}
      </ul>
    </SolutionLayout>
  );
};
