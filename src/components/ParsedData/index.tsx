import { FC, useEffect, useState } from "react";

const ParsedData: FC<{ data: string[][] }> = ({ data }) => {
    const [list, setList] = useState<string[][]>([]);
    useEffect(() => {
        setList(data.slice(3, data.length - 1))
    }, [data]);

    const [hoveredItemInd, setHoveredItemInd] = useState<number | null>(null);
    const [itemIndToChange, setItemIndToChange] = useState<number | null>(null);
    const [itemValueToChange, setItemValueToChange] = useState<string>('');

    const changeList = () => {
        setList((prev) => prev.map((item, ind) => itemIndToChange === ind ? [item[0], itemValueToChange] : item))
        setItemIndToChange(null)
    }

    return (
        <section className="flex flex-col gap-7 p-12">
            <div className="flex flex-row justify-between items-center">
                <div className="w-1/4 flex flex-col">
                    <p className="border-b border-light-gray text-center text-black">{data[0][0]}</p>
                    <p className="text-center text-gray">1 (дата)</p>
                </div>
                <div className="w-1/4 flex flex-col">
                    <p className="border-b border-light-gray text-center text-black">{data[0][2]}</p>
                    <p className="text-center text-grayc">2 (номер)</p>
                </div>
            </div>
            <p>{data[2][0]}</p>
            <div className="flex flex-col gap-3">
                {
                    list.map((item, ind) => (
                        <div
                            onMouseEnter={() => setHoveredItemInd(ind)}
                            onMouseLeave={() => setHoveredItemInd(null)}
                            key={ind}
                            className="pb-3 border-b border-light-gray flex flex-row gap-3 relative items-center">
                            <p className="text-gray w-1/3 mb-auto">{item[0]}</p>
                            {
                                itemIndToChange === ind ?
                                    <textarea
                                        onBlur={changeList}
                                        rows={3}
                                        className="w-2/3 h-fit outline-none border-2 rounded-md p-2 border-light-gray"
                                        onChange={(e) => setItemValueToChange(e.currentTarget.value)}
                                        value={itemValueToChange}></textarea> :
                                    <p className="w-2/3">{item[1]}</p>
                            }
                            {
                                hoveredItemInd === ind &&
                                <button
                                    onClick={() => { itemIndToChange === ind ? changeList() : setItemIndToChange(ind); setItemValueToChange(item[1]) }}
                                    className="p-3 rounded-full bg-white absolute right-[-18px] shadow hover:bg-light-gray-secondary">
                                    <img className="w-4 h-4" src={itemIndToChange === ind ? "/checkmark.svg" : "/pen.svg"} alt="+" />
                                </button>
                            }
                        </div>
                    ))
                }
            </div>
            <p>{data[data.length - 1][0]}</p>
            <p>{data[data.length - 1][1]}</p>
        </section>
    );
}

export default ParsedData;