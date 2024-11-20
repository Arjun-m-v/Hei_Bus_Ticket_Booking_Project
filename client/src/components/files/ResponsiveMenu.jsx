import { AnimatePresence, motion } from "framer-motion"

function ResponsiveMenu({open}) {
  return (
    <AnimatePresence mode="wait">
        {
            open &&(
                <motion.div 
                    initial={{opacity:0, y:-100}}
                    animate={{opacity:1,y:0}}
                    exit={{opacity:0,y:-100}}
                    transition={{duration:0.3}}
                    className='fixed top-0 left-0 w-full h-full bg-black/60 z-10'
                    >
            <div className="text-xl font-semibold bg-red text-white py-10 m-6 rounded-3xl">
                <ul className="flex flex-col justify-center items-center gap-10">
                    <li>Bus1</li>
                    <li>Bus2</li>
                    <li>Bus3</li>
                    <li>Bus4</li>
                </ul>
            </div>
            </motion.div>
        )}

    </AnimatePresence>
  )
};

export default ResponsiveMenu
