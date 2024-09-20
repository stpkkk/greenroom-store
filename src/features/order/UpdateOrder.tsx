import { ActionFunctionArgs, useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiGreenRoom';

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button style="primary">Добавить доставку</Button>
    </fetcher.Form>
  );
}
export default UpdateOrder;

//React-Router-Dom action triggered by fetcher.Form
export async function action({ params }: ActionFunctionArgs) {
  const { orderId } = params;
  if (!orderId) {
    throw new Error('Order ID is required');
  }

  const data = { delivery: true };
  await updateOrder(params.orderId || '', data);
  return null;
}
