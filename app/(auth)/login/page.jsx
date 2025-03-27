"use client"


import Image from "next/image"
import { MdOutlineDoubleArrow } from "react-icons/md"
import { Suspense } from "react";
import { CarouselComponent } from "@/components/CarouselComponent"

import { EmailLoginForm } from "@/components/EmailLoginForm"

const OPTIONS = { dragFree: true }
const SLIDES = [
  "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://media.istockphoto.com/id/538323138/photo/manager-training-new-employees.jpg?s=612x612&w=0&k=20&c=BwPQPivEoi3LtAXDw1E1dxK306r1xswWlbpmSY7VQyE=",
  "https://media.istockphoto.com/id/1405261579/photo/businessman-doing-a-presentation-in-the-conference-room.jpg?s=612x612&w=0&k=20&c=Pa0rYzTSOpoHleC8eDigswwLC9RxAFr16-QGydW-UGw=",
]

// const queryParamList: QueryList = [
//   {
//     identifier: "type",
//     name: "mobile",
//     isDefault: false,
//   },
//   {
//     identifier: "type",
//     name: "email",
//     isDefault: true,
//   },
// ]

export function Login() {
 

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="flex h-full flex-col justify-center gap-y-4 max-[1230px]:items-center min-[1231px]:justify-between">
      <div>
        <div className="hidden w-44 items-center justify-center bg-[#580881] py-5 min-[1231px]:flex">
          <div className="relative h-24 w-24">
            <Image
              src="/ProsperoIQ.jpeg"
              alt="Logo"
              fill
              sizes="50vw, (max-width: 1024px): 30vw"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkyDlfDwADawG8NRzv6QAAAABJRU5ErkJggg=="
              quality={100}
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="flex h-[560px] justify-center max-[1230px]:flex-col max-[1230px]:space-y-4 max-sm:px-4 min-[1231px]:ml-44 min-[1231px]:mr-auto">
          <div className="relative w-full">
            <section className="sandbox__carousel pointer-events-none h-[560px] max-[1230px]:hidden">
              <CarouselComponent
                slides={SLIDES}
                options={OPTIONS}
                imgWidth={760}
                imgHeight={560}
                imgAlt="Login images"
              />
            </section>
            <div className="max-[1230px]:flex max-[1230px]:space-x-4 min-[1231px]:absolute min-[1231px]:bottom-[30px] min-[1231px]:right-12">
              <div className="h-fit w-fit items-center justify-center rounded-lg bg-[#580881] p-3 md:p-5 min-[1231px]:hidden">
                <div className="relative h-10 w-10 sm:h-20 sm:w-20 md:h-24 md:w-24">
                  <Image
                    src="/ProsperoIQ.jpeg"
                    alt="Logo"
                    fill
                    sizes="50vw, (max-width: 1024px): 30vw"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkyDlfDwADawG8NRzv6QAAAABJRU5ErkJggg=="
                    quality={100}
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-6 md:gap-x-11">
               
                <MdOutlineDoubleArrow className="text-[#A4AFB7]" size={50} />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white p-10 max-lg:rounded-xl min-[435px]:max-sm:w-[400px] sm:min-w-[440px] min-[1231px]:mr-28">
           
        <EmailLoginForm /> 
          </div>
        </div>
      </div>
      <footer className="mx-4 mb-10 min-[768px]:max-xl:mt-10">
       
      </footer>
    </div>
    </Suspense>
  )
}


export default Login