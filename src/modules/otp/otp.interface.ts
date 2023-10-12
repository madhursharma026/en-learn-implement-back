export interface OTP {
  startSMSVerification(mobileNumber: string): Promise<string>;
  checkVerification(mobileNumber: string, otpCode: string): Promise<string>;
}
