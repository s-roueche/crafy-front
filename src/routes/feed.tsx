import { createFileRoute } from '@tanstack/react-router'
import {useQuery} from "@tanstack/react-query";
import {getPublishedPosts} from "../queries/getQueries.tsx";
import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export const Route = createFileRoute('/feed')({
    component: RouteComponent,
})

function RouteComponent() {
    const {isLoading, isError, data, error} = useQuery({
        queryKey: ['PublishedPosts'],
        queryFn: getPublishedPosts,
        retryDelay: 1000
    });
    
    
    if (isLoading) {
        return <span>Loading...</span>;
    }
    
    if (isError && error instanceof Error) {
        return <span>Error: {error.message}</span>;
    }
    
    return (
        <>
            {data.map((post: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; content: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            ))}
        
        </>
    )
}
