import {Button} from "@heroui/react";
import {Gi3DMeeple } from 'icons-react/gi';
import './App.css'
import {useQuery} from "@tanstack/react-query";
import axios from 'axios';

function App() {
    async function getHello() {
        const response = await axios.get('http://localhost:3000');
        return response.data;
    }
    
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['helloWorld'],
        queryFn: getHello
    });

    if (isPending) {
        return <span>Loading...</span>;
    }

    if (isError && error instanceof Error) {
        return <span>Error: {error.message}</span>;
    }
    
    return (
        <>
            <h1 className="text-3xl font-bold">
                {data}
            </h1>
            <Gi3DMeeple />
            <Button color={"primary"}>Button</Button>
        </>
    );
}

export default App
