'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (password: string) => Promise<boolean>;
  t: (key: string) => string;
}

export default function PasswordModal({ isOpen, onClose, onVerify, t }: PasswordModalProps) {
  const [password, setPassword] = useState(['', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 重置状态当模态框打开
  useEffect(() => {
    if (isOpen) {
      setPassword(['', '', '', '', '']);
      setError('');
      setSuccess(false);
      setLoading(false);
      // 聚焦第一个输入框
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    // 只允许数字
    if (!/^\d*$/.test(value)) return;

    const newPassword = [...password];
    newPassword[index] = value.slice(-1); // 只取最后一位
    setPassword(newPassword);
    setError('');

    // 自动聚焦到下一个输入框
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    // 检查是否输入完成
    if (index === 4 && value) {
      const fullPassword = [...newPassword.slice(0, 4), value].join('');
      if (fullPassword.length === 5) {
        handleSubmit(fullPassword);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // 处理退格键
    if (e.key === 'Backspace') {
      if (!password[index] && index > 0) {
        // 当前为空，回退到上一个
        const newPassword = [...password];
        newPassword[index - 1] = '';
        setPassword(newPassword);
        inputRefs.current[index - 1]?.focus();
      } else {
        // 清空当前
        const newPassword = [...password];
        newPassword[index] = '';
        setPassword(newPassword);
      }
    }

    // 处理左右箭头
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // 检查是否是5位数字
    if (/^\d{5}$/.test(pastedData)) {
      const newPassword = pastedData.split('');
      setPassword(newPassword);
      handleSubmit(pastedData);
    }
  };

  const handleSubmit = async (fullPassword: string) => {
    if (fullPassword.length !== 5) {
      setError(t('test.password.incomplete') || '请输入完整5位密码');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const verified = await onVerify(fullPassword);
      if (verified) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 800);
      } else {
        setError(t('test.password.invalid') || '密码错误，请重试');
        setPassword(['', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError(t('test.password.error') || '验证失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = () => {
    const fullPassword = password.join('');
    handleSubmit(fullPassword);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{t('test.password.title') || '输入访问密码'}</h3>
                  <p className="text-white/70 text-sm">{t('test.password.subtitle') || '付费用户专享'}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-slate-600 text-center mb-6">
              {t('test.password.description') || '请输入您的5位数字访问密码'}
            </p>

            {/* Password Inputs */}
            <div className="flex justify-center gap-3 mb-6">
              {password.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={loading || success}
                  className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 
                    transition-all duration-200 outline-none
                    ${digit 
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                      : 'border-slate-200 bg-white text-slate-900 hover:border-slate-300'
                    }
                    ${error ? 'border-red-300 bg-red-50' : ''}
                    ${success ? 'border-green-500 bg-green-50 text-green-700' : ''}
                    focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100
                  `}
                />
              ))}
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 justify-center text-red-500 text-sm mb-4"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 justify-center text-green-500 text-sm mb-4"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {t('test.password.success') || '验证成功'}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              onClick={handleManualSubmit}
              disabled={loading || success || password.join('').length !== 6}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200
                ${loading || success
                  ? 'bg-slate-300 cursor-not-allowed'
                  : password.join('').length === 6
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:scale-[1.02]'
                    : 'bg-slate-300 cursor-not-allowed'
                }
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {t('test.password.verifying') || '验证中...'}
                </span>
              ) : success ? (
                t('test.password.verified') || '验证成功'
              ) : (
                t('test.password.submit') || '确认'
              )}
            </button>

            {/* Help Text */}
            <p className="text-center text-slate-400 text-xs mt-6">
              {t('test.password.help') || '没有密码？请联系管理员购买'}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
