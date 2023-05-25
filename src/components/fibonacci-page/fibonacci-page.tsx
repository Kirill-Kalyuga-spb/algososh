import React, { ChangeEvent, FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { nanoid } from "nanoid";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import style from './fibonacci-page.module.css'
import sleep from "../../utils/sleep";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState('')
  const [loader, setLoader] = useState(false)
  const [arr, setArr] = useState<Array<Number>>()

  const fibo = async (n: number) => {
    let array: number[] = []
    
    for(let i = 0; i < n + 1; i++) {
      await sleep(500)
      if(i < 2) {
        array[i] = 1;
        setArr([...array])
        continue
      }
      array[i] = array[i - 1] + array[i - 2]
      setArr([...array])
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(true)
    
    await fibo(Number(value))
    
    setLoader(false)
    setValue('')
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={style.form} onSubmit={onSubmit}>
        <Input
          min={0}
          max={19}
          isLimitText
          onChange={onChange}
          type="number"
          value={value}
        />
        <Button
          text="Рассчитать"
          isLoader={loader}
          type="submit"
          disabled={!value || (Number(value) > 19 || Number(value) < 0)}
        />
      </form>
      {arr !== undefined && (<ul className={style.symbolList} style={arr.length > 9 ? {justifyContent: "start"} : {}}>
        {arr?.map((item, index) => (
          <Circle key={nanoid()} letter={String(item)} index={index}/>
        ))}
      </ul>)}
    </SolutionLayout>
  );
};
