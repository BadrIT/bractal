import { createFragmentContainer } from 'react-relay';

const dummyFragmentContainer = component => component;

export default (process.isStyleguidistActive ? dummyFragmentContainer : createFragmentContainer);
