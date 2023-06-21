import Sorting from '@/components/sorting/Sorting';
import './matchMedia.mock';
import { render } from '@testing-library/react';
import { SortingType } from '@/types/sortingType';

test('SortingType renders correctly', () => {
  const component = render(
    <Sorting
      setSortingType={() => {}}
      sortingType={SortingType.All}
      isDisabled={false}
    />,
  );
  expect(component).toMatchSnapshot();
});
