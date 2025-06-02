"use client";
import { ChipIcon, DiamondIcon } from "@/assets";
import { Roulette } from "@/components";
import { headerData, resultRouletteData } from "@/data";
import { TableHeader, Tiles } from "@/ui";

export default function Home() {
  return (
    <div className='wrapper bg-background px-4 lg:px-[88px]'>
      <header className='content flex flex-col lg:flex-row items-center justify-between py-6  gap-5 lg:gap-2'>
        <div className='flex gap-1 '>
          {headerData.tiles.map((item, idx) => (
            <Tiles
              key={`${item.variant}_${idx}`}
              variant={item.variant}
              type={item.type}
            />
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <div className='uppercase text-grey-dark-3'>
            {headerData.info_last_100.text}
          </div>
          <div className='flex gap-4 items-center'>
            {headerData.info_last_100.tiles_count.map((item, idx) => (
              <div
                key={`${item.variant}_${idx}`}
                className='flex gap-2 items-center'
              >
                <Tiles variant={item.variant} type={item.type} />
                <span className='font-bold'>{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </header>
      <main className='content'>
        <Roulette />
        <div className='p-1 flex gap-2 justify-between items-center max-w-[425px] w-full h-[44px] mx-auto my-8'>
          <ChipIcon />
          <input className='flex-1 w-full rounded-[8px] bg-grey-dark-1 outline-0 h-full px-3' />
          <div className='flex gap-[2px] h-full '>
            <span className='rounded-[8px] bg-grey-dark-1 w-[50px]'></span>
            <span className='rounded-[8px] bg-grey-dark-1 w-[50px]'></span>
            <span className='rounded-[8px] bg-grey-dark-1 w-[50px]'></span>
            <span></span>
          </div>
        </div>
        <div className='flex gap-4 flex-wrap lg:flex-nowrap justify-between text-[14px]'>
          {resultRouletteData.result.map((item, idx) => (
            <div key={`${item.id}_${idx}`} className='w-full'>
              <TableHeader variant={item.variant}>
                <div className='uppercase font-bold flex justify-between w-full'>
                  <span>
                    {resultRouletteData.header_text} {item.variant}
                  </span>
                  <span>
                    {resultRouletteData.header_subtext} {item.text}
                  </span>
                </div>
              </TableHeader>
              <div className='p-3 flex justify-between items-center '>
                <div>{item.users.length} Bets total</div>
                <div className='flex gap-2 items-center'>
                  <ChipIcon />
                  {Math.max(...item.users.map((user) => user.count)).toFixed(2)}
                </div>
              </div>
              <div className='rounded-[8px] bg-grey-dark-4 font-medium'>
                {item.users.map((item, idx) => (
                  <div
                    key={`${item.name}_${idx}`}
                    className={`flex justify-between w-full px-3 py-2 ${idx == 1 && "bg-grey-dark-2"}`}
                  >
                    <div className='flex items-center gap-[6px] flex-1 py-0 xl:pl-7'>
                      <DiamondIcon />
                      {item.name}
                    </div>
                    <div className='flex items-center gap-2 '>
                      <ChipIcon />
                      {item.count.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className='content'></footer>
    </div>
  );
}
