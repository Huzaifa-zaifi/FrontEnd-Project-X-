import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (isAuthenticated && user) {
    switch (user.role) {
      case 'supervisor':
        return <Navigate to="/supervisor" replace />;
      case 'admin':
        return <Navigate to="/supervisor" replace />; // admin page can be added later
      case 'employee':
      case 'client':
      default:
        return <Navigate to="/dashboard" replace />;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast({
        title: 'Error',
        description: 'Please enter your email and password.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = login(formData.email, formData.password);

    if (result.success) {
      toast({
        title: 'Welcome back!',
        description: 'You have successfully logged in.',
      });
    
      // Navigate based on role
      switch (result.role) {
        case 'supervisor':
          navigate('/supervisor');
          break;
        case 'admin':
          navigate('/supervisor'); // admin shares supervisor dashboard
          break;
        case 'employee':
          navigate('/dashboard');
          break;
        case 'client':
          navigate('/dashboard'); // or some client page
          break;
        default:
          navigate('/login');
      }
    } else {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password.',
        variant: 'destructive',
      });
    }
    

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-sidebar flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-wide">REDVION</h1>
          <p className="text-sidebar-muted text-sm mt-1">Safety Observation System</p>
        </div>
        <div className="max-w-md">
          <h2 className="text-4xl font-bold text-sidebar-foreground leading-tight">
            Manage Safety Observations Efficiently
          </h2>
          <p className="text-sidebar-muted mt-4 text-lg">
            Review observations, assign corrective actions, and track safety performance.
          </p>
        </div>
        <div className="text-sidebar-muted text-sm">
          © 2024 Redvion. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden mb-8">
            <h1 className="text-2xl font-bold text-primary tracking-wide">REDVION</h1>
            <p className="text-muted-foreground text-sm mt-1">Safety Observation System</p>
          </div>

          <div className="bg-card rounded-2xl shadow-card p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
                <LogIn className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-card-foreground">Welcome back</h2>
              <p className="text-muted-foreground mt-1">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="supervisor@redvion.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground font-medium mb-2">Demo Accounts:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><strong>Supervisor:</strong> supervisor@redvion.com</p>
                <p><strong>Admin:</strong> admin@redvion.com</p>
                <p><strong>Employee:</strong> employee@redvion.com</p>
                <p><strong>Password:</strong> any 4+ characters</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
