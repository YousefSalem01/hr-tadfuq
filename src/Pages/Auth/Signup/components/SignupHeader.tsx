import logo from '../../../../assets/logos/logo.svg';

const SignupHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <img src={logo} alt="Santalam Tax Consultancy" className="h-12" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
      <p className="text-gray-500">Join our HR management platform</p>
    </div>
  );
};

export default SignupHeader;

