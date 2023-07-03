import renderer from 'react-test-renderer'
import { Button } from '../button';

describe('Тест компонента Button', () => {
    it('с текстом', () => {
        const tree = renderer
        .create(<Button text='какой-то текст' />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('без тескта', () => {
        const tree = renderer
        .create(<Button text='' />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('заблокирована', () => {
        const tree = renderer
        .create(<Button disabled />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('загружается', () => {
        const tree = renderer
        .create(<Button isLoader={true} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
})