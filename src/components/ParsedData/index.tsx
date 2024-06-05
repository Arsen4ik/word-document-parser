import { FC, useEffect, useState } from "react";

const ParsedData: FC<{ data: string[][] }> = ({ data }) => {

    const [list, setList] = useState<string[][]>([]);

    useEffect(() => {
        console.log(data);
        let newObj = []
        // Object.keys(resultObject).forEach(el => {

        // })
        // const dataCheck = Object.keys(resultObject)
        newObj.push(['1 (дата)', data[0][0]], ['2 (номер)', data[0][2]])
        data.slice(3).forEach(el => {
            if (el[0].includes('Грузоотправитель')) {
                newObj.push(['3 Грузоотправитель', el[1]])
            } else if (el[0].includes('Заказчик')) {
                newObj.push(['4 Клиент', el[1]])
            } else if (el[0].includes('Экспедитор')) {
                newObj.push(['5 Экспедитор', el[1]])
            } else if (el[0].includes('Наименование груза')) {
                const elArr = el[1].split(',')
                newObj.push(['6 Страна происхождения груза', elArr[0]], ['7 Товарный код', elArr[2]], ['8 Маркировка', elArr[1]])
            } else if (el[0].includes('Вес груза')) {
                const elArr = el[1].split(',')
                newObj.push(['9 Количество мест, вид упаковки', elArr[0]], ['10 Вес брутто, нетто', elArr[1]], ['11 Объем', elArr[4]], ['13 Размер упаковки', elArr[3]])
            } else if (el[0].includes('Стоимость груза')) {
                newObj.push(['12 Стоимость', el[1]])
            }
        })
        newObj = newObj.sort((a, b) => +a[0].split(' ')[0] - +b[0].split(' ')[0]);
        newObj.push(['14 Условия', ''], ['15 Особые отметки', ''], ['16 Подпись экспедитора', ''])

        console.log(newObj);
        setList(newObj)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    // useEffect(() => {
    //     data.
    // }, [data]);

    const [hoveredItemInd, setHoveredItemInd] = useState<number | null>(null);
    const [itemIndToChange, setItemIndToChange] = useState<number | null>(null);
    const [itemValueToChange, setItemValueToChange] = useState<string>('');

    const changeList = () => {
        setList((prev) => prev.map((item, ind) => itemIndToChange === ind ? [item[0], itemValueToChange] : item))
        setItemIndToChange(null)
    }

    return (
        <section className="flex flex-col gap-7 p-12">
            <h1 className="text-center font-bold text-3xl mb-10">Экспедиторская расписка</h1>
            {
                !!list.length &&
                <>
                    <div className="flex flex-row justify-between items-center">
                        <div className="w-1/4 flex flex-col">
                            <div
                                onMouseEnter={() => setHoveredItemInd(0)}
                                onMouseLeave={() => setHoveredItemInd(null)}
                                className="relative w-full min-h-6 border-b border-gray flex flex-row justify-center items-center">
                                {
                                    itemIndToChange === 0 ?
                                        <input
                                            onBlur={changeList}
                                            className="w-full mb-1 h-fit outline-none border-2 rounded-md p-2 border-light-gray"
                                            onChange={(e) => setItemValueToChange(e.currentTarget.value)}
                                            value={itemValueToChange} /> :
                                        <p className="text-center text-black min-h-[25px]">{list[0][1]}</p>
                                }
                                {
                                    hoveredItemInd === 0 &&
                                    <button
                                        onClick={() => { itemIndToChange === 0 ? changeList() : setItemIndToChange(0); setItemValueToChange(list[0][1]) }}
                                        className="p-3 rounded-full bg-white absolute right-[-18px] shadow hover:bg-light-gray-secondary print:hidden">
                                        <img className="w-4 h-4" src={itemIndToChange === 0 ? "/checkmark.svg" : "/pen.svg"} alt="+" />
                                    </button>
                                }
                            </div>
                            <p className="text-center text-gray">1 (дата)</p>
                        </div>
                        <div className="w-1/4 flex flex-col">
                            <div
                                onMouseEnter={() => setHoveredItemInd(1)}
                                onMouseLeave={() => setHoveredItemInd(null)}
                                className="relative w-full min-h-6 border-b border-gray flex flex-row justify-center items-center">
                                {
                                    itemIndToChange === 1 ?
                                        <input
                                            onBlur={changeList}
                                            className="w-full mb-1 h-fit outline-none border-2 rounded-md p-2 border-light-gray"
                                            onChange={(e) => setItemValueToChange(e.currentTarget.value)}
                                            value={itemValueToChange} /> :
                                        <p className="text-center text-black min-h-[25px]">{list[1][1]}</p>
                                }
                                {
                                    hoveredItemInd === 1 &&
                                    <button
                                        onClick={() => { itemIndToChange === 1 ? changeList() : setItemIndToChange(1); setItemValueToChange(list[1][1]) }}
                                        className="p-3 rounded-full bg-white absolute right-[-18px] shadow hover:bg-light-gray-secondary print:hidden">
                                        <img className="w-4 h-4" src={itemIndToChange === 1 ? "/checkmark.svg" : "/pen.svg"} alt="+" />
                                    </button>
                                }
                            </div>
                            <p className="text-center text-gray">2 (номер)</p>
                        </div>
                    </div>
                    {/* <p>{data[2][0]}</p> */}
                    <div className="flex flex-col gap-3">
                        {
                            list.slice(2, 6).map((item, ind) => (
                                <div
                                    onMouseEnter={() => setHoveredItemInd(ind + 2)}
                                    onMouseLeave={() => setHoveredItemInd(null)}
                                    key={ind + 2}
                                    className=" flex flex-row gap-3 relative items-center">
                                    <p className="text-gray w-1/4 mb-auto">{item[0]}</p>
                                    {
                                        itemIndToChange === ind + 2 ?
                                            <textarea
                                                onBlur={changeList}
                                                rows={1}
                                                className="w-3/4 h-fit outline-none border-2 rounded-md p-2 border-light-gray"
                                                onChange={(e) => setItemValueToChange(e.currentTarget.value)}
                                                value={itemValueToChange}></textarea> :
                                            <p className="w-3/4 border-b border-gray min-h-[25px]">{item[1]}</p>
                                    }
                                    {
                                        hoveredItemInd === ind + 2 &&
                                        <button
                                            onClick={() => { itemIndToChange === ind + 2 ? changeList() : setItemIndToChange(ind + 2); setItemValueToChange(item[1]) }}
                                            className="p-3 rounded-full bg-white absolute right-[-18px] shadow hover:bg-light-gray-secondary print:hidden">
                                            <img className="w-4 h-4" src={itemIndToChange === ind + 2 ? "/checkmark.svg" : "/pen.svg"} alt="+" />
                                        </button>
                                    }
                                </div>
                            ))
                        }
                        {
                            <div className="flex flex-row gap-5 w-full">
                                <div
                                    onMouseEnter={() => setHoveredItemInd(6)}
                                    onMouseLeave={() => setHoveredItemInd(null)}
                                    className="w-1/2  flex flex-row gap-3 relative items-center">
                                    <p className="text-gray w-fit text-nowrap">{list[6][0]}</p>
                                    {
                                        itemIndToChange === 6 ?
                                            <textarea
                                                onBlur={changeList}
                                                rows={1}
                                                className="w-full h-fit outline-none border-2 rounded-md p-2 border-light-gray"
                                                onChange={(e) => setItemValueToChange(e.currentTarget.value)}
                                                value={itemValueToChange}></textarea> :
                                            <p className="w-full border-b border-gray min-h-[25px]">{list[6][1]}</p>
                                    }
                                    {
                                        hoveredItemInd === 6 &&
                                        <button
                                            onClick={() => { itemIndToChange === 6 ? changeList() : setItemIndToChange(6); setItemValueToChange(list[6][1]) }}
                                            className="p-3 rounded-full bg-white absolute right-[-18px] shadow hover:bg-light-gray-secondary print:hidden">
                                            <img className="w-4 h-4" src={itemIndToChange === 6 ? "/checkmark.svg" : "/pen.svg"} alt="+" />
                                        </button>
                                    }
                                </div>
                                <div
                                    onMouseEnter={() => setHoveredItemInd(7)}
                                    onMouseLeave={() => setHoveredItemInd(null)}
                                    className="w-1/2  flex flex-row gap-3 relative items-center">
                                    <p className="text-gray w-fit text-nowrap">{list[7][0]}</p>
                                    {
                                        itemIndToChange === 7 ?
                                            <textarea
                                                onBlur={changeList}
                                                rows={1}
                                                className="w-full h-fit outline-none border-2 rounded-md p-2 border-light-gray"
                                                onChange={(e) => setItemValueToChange(e.currentTarget.value)}
                                                value={itemValueToChange}></textarea> :
                                            <p className="w-full border-b border-gray min-h-[25px]">{list[7][1]}</p>
                                    }
                                    {
                                        hoveredItemInd === 7 &&
                                        <button
                                            onClick={() => { itemIndToChange === 7 ? changeList() : setItemIndToChange(7); setItemValueToChange(list[7][1]) }}
                                            className="p-3 rounded-full bg-white absolute right-[-18px] shadow hover:bg-light-gray-secondary print:hidden">
                                            <img className="w-4 h-4" src={itemIndToChange === 7 ? "/checkmark.svg" : "/pen.svg"} alt="+" />
                                        </button>
                                    }
                                </div>
                            </div>
                        }
                        <div
                            onMouseEnter={() => setHoveredItemInd(8)}
                            onMouseLeave={() => setHoveredItemInd(null)}
                            className=" flex flex-row gap-3 relative items-center">
                            <p className="text-gray w-1/4">{list[8][0]}</p>
                            {
                                itemIndToChange === 8 ?
                                    <textarea
                                        onBlur={changeList}
                                        rows={1}
                                        className="w-3/4 h-fit outline-none border-2 rounded-md p-2 border-light-gray"
                                        onChange={(e) => setItemValueToChange(e.currentTarget.value)}
                                        value={itemValueToChange}></textarea> :
                                    <p className="w-3/4 border-b border-gray min-h-[25px]">{list[8][1]}</p>
                            }
                            {
                                hoveredItemInd === 8 &&
                                <button
                                    onClick={() => { itemIndToChange === 8 ? changeList() : setItemIndToChange(8); setItemValueToChange(list[8][1]) }}
                                    className="p-3 rounded-full bg-white absolute right-[-18px] shadow hover:bg-light-gray-secondary print:hidden">
                                    <img className="w-4 h-4" src={itemIndToChange === 8 ? "/checkmark.svg" : "/pen.svg"} alt="+" />
                                </button>
                            }
                        </div>
                        <div className="flex flex-row gap-5 w-full">
                            <div
                                onMouseEnter={() => setHoveredItemInd(9)}
                                onMouseLeave={() => setHoveredItemInd(null)}
                                className="w-1/3 flex flex-row gap-3 relative items-center">
                                <p className="text-gray w-fit text-nowrap">{list[9][0]}</p>
                                {
                                    itemIndToChange === 9 ?
                                        <textarea
                                            onBlur={changeList}
                                            rows={1}
                                            className="w-full h-fit outline-none border-2 rounded-md p-2 border-light-gray"
                                            onChange={(e) => setItemValueToChange(e.currentTarget.value)}
                                            value={itemValueToChange}></textarea> :
                                        <p className="w-full border-b border-gray min-h-[25px] text-nowrap">{list[9][1]}</p>
                                }
                                {
                                    hoveredItemInd === 9 &&
                                    <button
                                        onClick={() => { itemIndToChange === 9 ? changeList() : setItemIndToChange(9); setItemValueToChange(list[9][1]) }}
                                        className="p-3 rounded-full bg-white absolute right-[-18px] shadow hover:bg-light-gray-secondary print:hidden">
                                        <img className="w-4 h-4" src={itemIndToChange === 9 ? "/checkmark.svg" : "/pen.svg"} alt="+" />
                                    </button>
                                }
                            </div>
                            <div
                                onMouseEnter={() => setHoveredItemInd(10)}
                                onMouseLeave={() => setHoveredItemInd(null)}
                                className="w-1/3 flex flex-row gap-3 relative items-center">
                                <p className="text-gray w-fit text-nowrap">{list[10][0]}</p>
                                {
                                    itemIndToChange === 10 ?
                                        <textarea
                                            onBlur={changeList}
                                            rows={1}
                                            className="w-full h-fit outline-none border-2 rounded-md p-2 border-light-gray"
                                            onChange={(e) => setItemValueToChange(e.currentTarget.value)}
                                            value={itemValueToChange}></textarea> :
                                        <p className="w-full border-b border-gray min-h-[25px] text-nowrap">{list[10][1]}</p>
                                }
                                {
                                    hoveredItemInd === 10 &&
                                    <button
                                        onClick={() => { itemIndToChange === 10 ? changeList() : setItemIndToChange(10); setItemValueToChange(list[10][1]) }}
                                        className="p-3 rounded-full bg-white absolute right-[-18px] shadow hover:bg-light-gray-secondary print:hidden">
                                        <img className="w-4 h-4" src={itemIndToChange === 10 ? "/checkmark.svg" : "/pen.svg"} alt="+" />
                                    </button>
                                }
                            </div>
                            <div
                                onMouseEnter={() => setHoveredItemInd(11)}
                                onMouseLeave={() => setHoveredItemInd(null)}
                                className="w-1/3 flex flex-row gap-3 relative items-center">
                                <p className="text-gray w-fit text-nowrap">{list[11][0]}</p>
                                {
                                    itemIndToChange === 11 ?
                                        <textarea
                                            onBlur={changeList}
                                            rows={1}
                                            className="w-full h-fit outline-none border-2 rounded-md p-2 border-light-gray"
                                            onChange={(e) => setItemValueToChange(e.currentTarget.value)}
                                            value={itemValueToChange}></textarea> :
                                        <p className="w-full border-b border-gray min-h-[25px] text-nowrap">{list[11][1]}</p>
                                }
                                {
                                    hoveredItemInd === 11 &&
                                    <button
                                        onClick={() => { itemIndToChange === 11 ? changeList() : setItemIndToChange(11); setItemValueToChange(list[11][1]) }}
                                        className="p-3 rounded-full bg-white absolute right-[-18px] shadow hover:bg-light-gray-secondary print:hidden">
                                        <img className="w-4 h-4" src={itemIndToChange === 11 ? "/checkmark.svg" : "/pen.svg"} alt="+" />
                                    </button>
                                }
                            </div>
                        </div>
                        {
                            list.slice(12).map((item, ind) => (
                                <div
                                    onMouseEnter={() => setHoveredItemInd(ind + 12)}
                                    onMouseLeave={() => setHoveredItemInd(null)}
                                    key={ind + 12}
                                    className=" flex flex-row gap-3 relative items-center">
                                    <p className="text-gray w-1/4 mb-auto">{item[0]}</p>
                                    {
                                        itemIndToChange === ind + 12 ?
                                            <textarea
                                                onBlur={changeList}
                                                rows={1}
                                                className="w-3/4 h-fit outline-none border-2 rounded-md p-2 border-light-gray"
                                                onChange={(e) => setItemValueToChange(e.currentTarget.value)}
                                                value={itemValueToChange}></textarea> :
                                            <p className="w-3/4 border-b border-gray min-h-[25px]">{item[1]}</p>
                                    }
                                    {
                                        hoveredItemInd === ind + 12 &&
                                        <button
                                            onClick={() => { itemIndToChange === ind + 12 ? changeList() : setItemIndToChange(ind + 12); setItemValueToChange(item[1]) }}
                                            className="p-3 rounded-full bg-white absolute right-[-18px] shadow hover:bg-light-gray-secondary print:hidden">
                                            <img className="w-4 h-4" src={itemIndToChange === ind + 12 ? "/checkmark.svg" : "/pen.svg"} alt="+" />
                                        </button>
                                    }
                                </div>
                            ))
                        }
                    </div>
                    {/* <p>{data[data.length - 1][0]}</p>
            <p>{data[data.length - 1][1]}</p> */}
                </>
            }
        </section>
    );
}

export default ParsedData;