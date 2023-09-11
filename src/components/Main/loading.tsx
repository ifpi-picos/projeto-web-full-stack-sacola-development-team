interface LoadingProps {
    isLoading: boolean
}

export default function Loading(props: LoadingProps) {

    if (!props.isLoading) return (<></>)

    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center backdrop-blur-2xl">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-aliceblue-50"/>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

