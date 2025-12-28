import logo from '../../../../assets/logos/logo.svg';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <img src={logo} alt="Santalam Tax Consultancy" className="h-12" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
      <p className="text-gray-500">Sign in to your HR management account</p>
    </div>
  );
};

export default LoginHeader;

