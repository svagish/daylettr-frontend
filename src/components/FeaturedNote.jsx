import { useState } from "react"

export const FeaturedNote = ({ note, onClickAdd, onClickRemove }) => {
    if (!note) return null
    const [isCollectionClicked, setIsCollectionClicked] = useState(false)
    return (
        <div className="mt-4 w-full max-w-md ">
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/30 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <span>🏆</span>
                    <span className="text-xs font-semibold tracking-widest text-amber-700 uppercase">
                        Yesterday's Most Inspiring Note
                    </span>
                </div>
                <p className="font-serif text-lg text-zinc-800 dark:text-zinc-200 leading-relaxed italic mb-4">
                    "
                    {
                        "True confidence is rooted in knowing your worth, not in seeking approval. Confidence begins where comparison ends."
                    }
                    "
                </p>
                <div className="flex justify-end gap-1 mt-4">
                    {/*add to collection*/}

                    <button
                        className="group relative p-2 rounded-full transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
                        title="Add to collection"
                        onClick={() => {
                            !isCollectionClicked
                                ? onClickAdd()
                                : onClickRemove()
                            setIsCollectionClicked(!isCollectionClicked)
                        }}
                    >
                        <div style={{ transform: "none" }}>
                            {isCollectionClicked ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="zinc-800"
                                    stroke="zinc-800"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="transition-colors duration-300 text-zinc-800 dark:text-zinc-200"
                                >
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="transition-colors duration-300 text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
                                >
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                                </svg>
                            )}
                        </div>
                    </button>

                    {/*share*/}
                    <button
                        className="p-2 text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900/20"
                        title="Share this note"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
