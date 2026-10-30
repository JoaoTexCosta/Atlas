import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { ListScreen } from './screens/ListScreen';
import { CreateScreen } from './screens/CreateScreen';
import { EditScreen } from './screens/EditScreen';
import { DeleteScreen } from './screens/DeleteScreen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <ListScreen /> },
      { path: '/create', element: <CreateScreen /> },
      { path: '/edit/:id', element: <EditScreen /> },
      { path: '/delete/:id', element: <DeleteScreen /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
