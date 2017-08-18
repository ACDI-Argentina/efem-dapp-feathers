import Accounts from 'web3-eth-accounts';

export default (req, res, next) => {

  const signature = req.headers.authorization;
  console.log('header -> ', signature);
  console.log('query -> ', req.query);

  if (signature) {
    const user = getUser(signature);

    Object.assign(req, { authenticated: true, user });
    Object.assign(req.feathers, { authenticated: true, user });
  }

  next();
}

export const getUser = signature => {
  try {
    const accounts = new Accounts();
    const address = accounts.recover(accounts.hashMessage(''), signature);

    return {
      user: {
        address,
      },
    }
  } catch (e) {
    console.warn('error recovering address from signature');
  }
};