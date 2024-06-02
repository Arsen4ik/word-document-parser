import mammoth from 'mammoth';
import { Dispatch, FC, SetStateAction, useRef, useState, ChangeEvent } from "react";

interface FileInputProps {
    setData: Dispatch<SetStateAction<string[][]>>;
}

const FileInput: FC<FileInputProps> = ({ setData }) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const name = file.name;
            const reader = new FileReader();

            reader.onload = async (event: ProgressEvent<FileReader>) => {
                const arrayBuffer = event.target?.result;
                if (arrayBuffer) {
                    const result = await mammoth.convertToHtml({ arrayBuffer } as { arrayBuffer: ArrayBuffer });

                    const parser = new DOMParser();
                    const htmlDoc = parser.parseFromString(result.value, 'text/html');
                    const table = htmlDoc.querySelector('table');
                    const rows = table?.querySelectorAll('tr');

                    const parsedData: string[][] = [];

                    rows?.forEach(row => {
                        const rowData: string[] = [];
                        const cells = row.querySelectorAll('td');
                        cells.forEach(cell => {
                            rowData.push(cell.textContent?.trim() || '');
                        });
                        parsedData.push(rowData);
                    });

                    setFileName(name);
                    setData(parsedData);
                }
            };

            reader.readAsArrayBuffer(file);
        }
    };

    const handleButtonFileClick = () => {
        if (inputFileRef.current) inputFileRef.current.click();
    };

    return (
        <section className='flex flex-row gap-5 pt-12 justify-center items-center transition-all print:hidden'>
            <button
                className="bg-light-gray-secondary hover:bg-light-gray flex flex-row gap-4 items-center py-3 px-12 rounded-md text-gray shadow hover:text-black transition-all"
                onClick={handleButtonFileClick}>
                <img className='h-7 w-7' src='/download.svg' alt="+" />Загрузить файл
            </button>
            <input
                type="file"
                multiple
                accept=".docx"
                onChange={handleFileChange}
                ref={inputFileRef}
                style={{ display: 'none' }}
            />
            {fileName && <p className='text-blue'>{fileName}</p>}
        </section>
    );
}

export default FileInput;
