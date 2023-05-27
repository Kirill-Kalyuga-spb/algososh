import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import style from './list-page.module.css'
import { Button } from "../ui/button/button";
import { nanoid } from "nanoid";
import { LinkedList } from "./LinkedList";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import sleep from "../../utils/sleep";
import { ElementStates } from "../../types/element-states";

const list = new LinkedList<string>();
const time = 500
const loaderNames = {
  addHead: 'addHead',
  addTail: 'addTail',
  addByIndex: 'addByIndex',
  removeHead: 'removeHead',
  removeTail: 'removeTail',
  removeByIndex: 'removeByIndex',
  default: 'default'
}

export const ListPage: React.FC = () => {
  const [value, setValue] = useState('')
  const [index, setIndex] = useState('')
  const [loader, setLoader] = useState({ name: loaderNames.default, loading: false })
  const [listArr, setListArr] = useState<Array<string>>([])
  const [changeIndex, setChangeIndex] = useState('')
  const [indexTail, setIndexTail] = useState('')
  const [endChanges, setEndChanges] = useState('')

  const removeByIndex = async () => {
    setLoader({name: loaderNames.removeByIndex, loading: true})
    list.removeAt(Number(index))
    setIndexTail(index)
    await sleep(time)

    setIndexTail('')
    setListArr(list.getArr())
    setIndex('')
    setLoader({...loader})
  }

  const removeFromHead = async () => {
    setLoader({name: loaderNames.removeHead, loading: true})
    list.removeAt(0)
    setIndexTail('0')
    await sleep(time)

    setIndexTail('')
    setListArr(list.getArr())
    setLoader({...loader})
  }

  const removeFromTail = async () => {
    setLoader({name: loaderNames.removeTail, loading: true})
    list.removeAt(list.getSize() - 1)
    setIndexTail(String(list.getSize()))
    await sleep(time)

    setIndexTail('')
    setListArr(list.getArr())
    setLoader({...loader})
  }

  const addByIndex = async () => {
    setLoader({name: loaderNames.addByIndex, loading: true})
    list.insertAt(value, Number(index));
    setChangeIndex(index)
    await sleep(time)

    setEndChanges(index)
    setChangeIndex('')
    setListArr(list.getArr())
    await sleep(time)

    setEndChanges('')
    setValue('')
    setIndex('')
    setLoader({...loader})
  }

  const addToHead = async () => {
    setLoader({name: loaderNames.addHead, loading: true})
    list.insertAt(value, 0);
    setChangeIndex('0')
    await sleep(time)

    setEndChanges('0')
    setChangeIndex('')
    setListArr(list.getArr())
    await sleep(time)

    setEndChanges('')
    setValue('')
    setLoader({...loader})
  }

  const addToTail = async () => {
    setLoader({name: loaderNames.addTail, loading: true})
    list.append(value)
    setChangeIndex(String(list.getSize() - 2))
    await sleep(time)

    setChangeIndex('')
    setListArr(list.getArr())
    setEndChanges(String(list.getSize() - 1))
    await sleep(time)
    
    setEndChanges('')
    setValue('')
    setLoader({...loader})
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onChangeIndexInput = (e: ChangeEvent<HTMLInputElement>) => {
    setIndex(e.target.value)
  }

  const setCircleHead = (index: number) => {
    const check = changeIndex !== '' ? Number(changeIndex) === index  : false
    return check ? (<Circle
    isSmall
    letter={value}
    state={ElementStates.Changing}
  />) : index === 0 ? 'head' : ''
  }

  const setCircleState = (index: number) => {
    if(String(index) === endChanges) {return ElementStates.Modified}
    return ElementStates.Default
  }

  const setCircleTail = ( item: string, index: number) => {
    const check = indexTail !== '' ? Number(indexTail) === index  : false
    return check ? (<Circle
      isSmall
      letter={item}
      state={ElementStates.Changing}
    />) : index === listArr.length - 1 ? 'tail' : ''
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={style.form}>
        <Input
          maxLength={4}
          isLimitText
          placeholder="Введите значение"
          name="value"
          value={value}
          onChange={onChangeInput}
        />
        <div className={style.container}>
          <Button
            type="button"
            text="Добавить в head"
            extraClass={style.button}
            onClick={addToHead}
            disabled={!value || listArr.length > 6 || loader.loading}
            isLoader={loader.loading && loader.name === loaderNames.addHead}
          />
          <Button
            type="button"
            text="Добавить в tail"
            extraClass={style.button}
            onClick={addToTail}
            disabled={!value || listArr.length > 6 || loader.loading}
            isLoader={loader.loading && loader.name === loaderNames.addTail}
          />
        </div>
        <div className={style.container}>
          <Button
            type="button"
            text="Удалить из head"
            extraClass={style.button}
            onClick={removeFromHead}
            disabled={!listArr.length || loader.loading}
            isLoader={loader.loading && loader.name === loaderNames.removeHead}
          />
          <Button
            type="button"
            text="Удалить из tail"
            extraClass={style.button}
            onClick={removeFromTail}
            disabled={!listArr.length || loader.loading}
            isLoader={loader.loading && loader.name === loaderNames.removeTail}
          />
        </div>
        <Input
          type="number"
          placeholder="Введите индекс"
          name="index"
          min={0}
          max={listArr.length - 1}
          value={index}
          onChange={onChangeIndexInput}
        />
        <Button
          type="button"
          text="Добавить по индексу"
          onClick={addByIndex}
          disabled={
            !(index && value) ||
            Number(index) > listArr.length - 1 ||
            Number(index) < 0 ||
            listArr.length > 6 ||
            loader.loading
          }
          isLoader={loader.loading && loader.name === loaderNames.addByIndex}
        />
        <Button
          type="button"
          text="Удалить по индексу"
          onClick={removeByIndex}
          disabled={
            !listArr.length || 
            Number(index) > listArr.length - 1 ||
            Number(index) < 0 ||
            !index ||
            loader.loading
          }
          isLoader={loader.loading && loader.name === loaderNames.removeByIndex}
        />
      </div>
      <ul className={style.symbolList}>
        {listArr?.map((item, index) => {
          return (
            <li className={style.symbolListItem} key={nanoid()}>
              <Circle
                extraClass={style.circle}
                index={index}
                letter={indexTail !== '' ? Number(indexTail) === index ? '' : item : item}
                state={setCircleState(index)}
                head={setCircleHead(index)}
                tail={setCircleTail(item, index)}
              />
              {index !== listArr.length - 1 && <ArrowIcon />}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
