"use client";

import { useState, ChangeEvent } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { toast } from "sonner";
import { ArrowRight, Upload,  Wallet, WalletIcon } from "lucide-react";

interface FormData {
  creatorType: "Youtuber" | "Musician" | "other";
  socialMedia: string;
  experience: "Beginner" | "Intermediate" | "Advance";
  walletConnected: boolean;
}

export default function OnboardingPage() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    creatorType: "Youtuber",
    socialMedia: "",
    experience: "Beginner",
    walletConnected: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const connectWallet = async () => {
    try {
      console.log("Connecting to Solana wallet...");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormData(prev => ({ ...prev, walletConnected: true }));
      
      console.log("Form data ready for API call:", {
        ...formData,
        walletConnected: true
      });
      
      
      toast.success("Wallet connected successfully!");
    } catch (err) {
      toast.error(`Connection Failed ${err}`);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.socialMedia || !formData.creatorType || !formData.experience) {
        toast.error("Please fill in all required fields.");
        return;
      }
    }

    if (step < 2) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      toast(
       "You have successfully completed the onboarding process!",
      );
      // In a real app, you would redirect to dashboard or home page
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-3xl px-4">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <StepIndicator 
              stepNumber={1} 
              title="Creator Profile" 
              active={step === 1} 
              completed={step > 1} 
              icon={<Upload className="h-5 w-5" />} 
            />
            <StepConnector completed={step > 1} />
            <StepIndicator 
              stepNumber={2} 
              title="Connect Wallet" 
              active={step === 2} 
              completed={false} 
              icon={<Wallet className="h-5 w-5" />} 
            />
          </div>
        </div>

        {/* Main Card */}
        <Card className="w-full">
          {/* Step 1: Creator Profile */}
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Creator Profile</CardTitle>
                <CardDescription>
                  Please provide your details to join our digital creator community.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
            
                <div className="space-y-2">
                  <Label htmlFor="creatorType">Creator Type</Label>
                  <select 
                    id="creatorType" 
                    name="creatorType" 
                    className="w-full p-2 border rounded-md"
                    value={formData.creatorType} 
                    onChange={handleInputChange}
                  >
                    <option value="artist">Digital Artist</option>
                    <option value="musician">Musician</option>
                    <option value="collector">Collector</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialMedia">Social Media Handle</Label>
                  <Input 
                    id="socialMedia" 
                    name="socialMedia" 
                    value={formData.socialMedia} 
                    onChange={handleInputChange} 
                    placeholder="@yourhandle" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience with Digital Assets</Label>
                  <select 
                    id="experience" 
                    name="experience" 
                    className="w-full p-2 border rounded-md"
                    value={formData.experience} 
                    onChange={handleInputChange}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </CardContent>
            </>
          )}

          {/* Step 2: Connect Wallet */}
          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Connect Solana Wallet</CardTitle>
                <CardDescription>
                  Connect your Solana wallet to complete the onboarding process.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-md p-6">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Wallet className="h-16 w-16 text-blue-600" />
                    <h3 className="text-lg font-medium">Connect Your Wallet</h3>
                    <p className="text-center text-gray-500">
                      Connect your Solana wallet to access all features of our platform.
                    </p>
                    {formData.walletConnected ? (
                      <div className="flex items-center space-x-2 text-green-600">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        <span>Wallet Connected Successfully</span>
                      </div>
                    ) : (
                      <Button 
                        onClick={connectWallet} 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                         <WalletIcon
                            className='size-5'
                        />
                         <WalletModalProvider>
                            <div className="flex justify-between gap-2">
                            <WalletMultiButton style={{ 
                                background: 'transparent', 
                                }} 
                            />
                            </div>
                        </WalletModalProvider>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </>
          )}

          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={step === 1}
            >
              Back
            </Button>
            <Button 
              onClick={nextStep} 
              disabled={step === 2 && !formData.walletConnected}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {step === 2 ? "Complete" : "Continue"}
              {step < 2 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  stepNumber: number;
  title: string;
  active: boolean;
  completed: boolean;
  icon?: React.ReactNode;
}

// Step indicator component
function StepIndicator({ stepNumber, title, active, completed, icon }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
          active 
            ? "bg-blue-600 text-white" 
            : completed 
              ? "bg-green-500 text-white" 
              : "bg-gray-200 text-gray-600"
        }`}
      >
        {completed ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        ) : (
          icon || stepNumber
        )}
      </div>
      <span 
        className={`text-sm font-medium ${
          active ? "text-blue-600" : completed ? "text-green-500" : "text-gray-600"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

interface StepConnectorProps {
  completed: boolean;
}

function StepConnector({ completed }: StepConnectorProps) {
  return (
    <div className="flex-1 mx-2">
      <div 
        className={`h-1 ${
          completed ? "bg-green-500" : "bg-gray-200"
        }`}
      ></div>
    </div>
  );
}