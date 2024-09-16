import { useAppDispatch } from '../../redux/hooks';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

type UpdateItemQuantityProps = {
  id?: number;
  currentQuantity?: number;
};

function UpdateItemQuantity({ id, currentQuantity }: UpdateItemQuantityProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="md:gap-3 flex items-center gap-2">
      <Button
        style="round"
        onClick={() => dispatch(decreaseItemQuantity(id || 0))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        style="round"
        onClick={() => dispatch(increaseItemQuantity(id || 0))}
      >
        +
      </Button>
    </div>
  );
}
export default UpdateItemQuantity;
