/* eslint-disable */
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders learn react link', () => {
  render(
      <Router>
          <App />
      </Router>,
  );
  // eslint-disable-next-line max-len
  // const linkElement = screen.getByText('Join the NetConnect community today and start sharing your world with others!');
  // expect(linkElement).toBeInTheDocument();
});
