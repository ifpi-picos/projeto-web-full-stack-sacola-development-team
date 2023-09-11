import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function ProfileCard() {
    return (
        <div className="w-screen h-screen bg-blue-jeans-50 flex flex-row flex-wrap p-3">
            <div className=" mx-auto w-full md:w-2/3">
                <div
                    className="rounded-3xl shadow-lg bg-gray-900 md:bg-gray-900  w-full flex flex-row flex-wrap p-3 antialiased">
                    <div className="md:w-1/3 w-full md:w-1/3 h-72 md:h-96">
                        <img
                            className="rounded-lg shadow-lg antialiased mt-6 mx-auto md:mt-14 md:ml-14 h-48 md:h-64"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            alt="Profile"
                        />
                    </div>
                    <div className="md:w-2/3 w-full px-3 flex flex-row flex-wrap">
                        <div className="w-full text-right font-semibold relative pt-3 md:pt-0">
                            <div className="text-2xl text-white leading-tight">
                                <EditIcon className="text-white cursor-pointer hover:text-gray-400"/>
                            </div>

                            <div className="flex flex-col justify-center items-center p-10 text-2xl text-white">
                                <h3 className="text-center mb-2">Gabriel Marcos Batista Guimarães</h3>
                                <span>
                  000001#{" "}
                                    <ContentCopyIcon
                                        className="text-white cursor-pointer hover:text-gray-400 mx-auto "/>
                </span>
                            </div>

                            <div className="flex flex-row justify-center items-center gap-2 text-2xl text-white">
                                Level: <span>5</span>
                            </div>
                            <div className="flex justify-center items-center flex-col">
                                <div
                                    className="flex flex-row justify-center items-center gap-2 text-2xl mt-8 w-56 h-16 bg-zinc-800 text-white">
                                    <h3>
                                        Amigos: <span>7</span>
                                    </h3>
                                </div>
                                <div
                                    className="flex flex-row justify-center items-center gap-2 text-2xl mt-8 w-56 h-16 bg-zinc-800 text-white ">
                                    <h3>
                                        Jogos: <span>48</span>
                                    </h3>
                                </div>
                                <div className="h-16"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
