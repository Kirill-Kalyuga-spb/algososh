import renderer from 'react-test-renderer'
import { Circle } from '../circle'
import { ElementStates } from '../../../../types/element-states';

describe('Тест компонента Circle', () => {
    it('без буквы', () => {
        const tree = renderer
        .create(<Circle letter='' />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('с буквами', () => {
        const tree = renderer
        .create(<Circle letter='ABC' />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('с head', () => {
        const tree = renderer
        .create(<Circle head='head' />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('с react-элементом в head', () => {
        const tree = renderer
        .create(<Circle head={<Circle />} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('с tail', () => {
        const tree = renderer
        .create(<Circle tail='tail' />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('с react-элементом в tail', () => {
        const tree = renderer
        .create(<Circle tail={<Circle />} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('с index', () => {
        const tree = renderer
        .create(<Circle index={1} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('с пропом isSmall ===  true', () => {
        const tree = renderer
        .create(<Circle isSmall={true} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('в состоянии default', () => {
        const tree = renderer
        .create(<Circle state={ElementStates.Default} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('в состоянии changing', () => {
        const tree = renderer
        .create(<Circle state={ElementStates.Changing} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
    it('в состоянии modified', () => {
        const tree = renderer
        .create(<Circle state={ElementStates.Modified} />)
        .toJSON();
        expect(tree).toMatchSnapshot();
    })
})