import { useAppDispatch } from '../../redux/hooks';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

type DeleteItemProps = {
  id?: number;
};

function DeleteItem({ id }: DeleteItemProps) {
  const dispatch = useAppDispatch();

  function handleDeleteFromCart() {
    if (id) {
      dispatch(deleteItem(id));
    }
  }

  if (!id) return;

  return (
    <Button style="small" onClick={handleDeleteFromCart}>
      Удалить
    </Button>
  );
}
export default DeleteItem;
