import React, { useEffect } from 'react';
import { Button } from '@headlessui/react'
import Table from './Table';
import { useQuery } from '@tanstack/react-query';
import Upload from './Upload';


const Container = () => {

    const url = "https://ee28-223-131-171-229.ngrok-free.app/price";
    // const url = "/price"
    // const url = "http://localhost:4000/price"
    const { isLoading, error, data, refetch } = useQuery({
        queryKey: ['priceData'],
        queryFn: () =>
            fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': `application/json`,
                    'ngrok-skip-browser-warning': '69420',
                }
            }).then((res) =>
                res.json(),
            ),
        enabled: false
    });

    useEffect(() => {
        console.log(data);
    } ,[data])


    if (error) return 'An error has occurred: ' + error.message;


    return (
        <div className="container max-w-[90vw] mx-auto  mt-5">
            
            

            <div className="p-3 bg-slate-300">


                <Button onClick={() => refetch()} className="mx-4 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                    Start Crwaling
                </Button>

                <Button className="mx-4 inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                    Export to excel
                </Button>

                <Upload />


            </div>


            <div className="mt-2">
                
                {
                    isLoading ? (
                        <div className="w-full h-[80vh] justify-center flex items-center">
                            <div
                                className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                                role="status">
                            </div>
                        </div>
                    ) : (
                        data ?
                            <>
                                <Table data={data} />
                            </>
                            : <>
                                <div>표시 할 데이터가 없습니다. 크롤링 버튼을 눌러주세요.</div>
                            </>

                    )
                }
            </div>
        </div>
    );
};

export default Container;