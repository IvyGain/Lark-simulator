'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LinearGradient } from '@/components/ui/linear-gradient'
import { 
  Rocket, 
  Calendar, 
  CheckCircle, 
  Sparkles, 
  ArrowRight, 
  Star,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react'

interface CTASectionProps {
  annualSavings?: number
  employeeCount?: number
}

export const CTASection: React.FC<CTASectionProps> = ({
  annualSavings,
  employeeCount,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleLarkInstall = () => {
    window.open('https://www.customercloud.co/lark-ivygain', '_blank')
  }

  const handleConsultation = () => {
    window.open('https://ivygain-project.jp.larksuite.com/scheduler/1077edbc8cd5e47a', '_blank')
  }

  const benefits = [
    {
      icon: Zap,
      title: '即座に導入開始',
      description: '5分で始められる簡単セットアップ'
    },
    {
      icon: Shield,
      title: 'エンタープライズ級セキュリティ',
      description: 'ISO27001認証取得済み'
    },
    {
      icon: Users,
      title: '無制限のユーザー招待',
      description: 'チーム全体で効率化を実現'
    },
    {
      icon: TrendingUp,
      title: '生産性30%向上',
      description: '実証済みの効果を体験'
    }
  ]

  const consultationFeatures = [
    '無料コンサルテーション',
    'カスタム導入プラン',
    '専任サポート',
    '成功事例の共有'
  ]

  return (
    <div className="space-y-8">
      {/* Hero CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card className="relative overflow-hidden border-0 shadow-2xl">
          <LinearGradient
            from="from-blue-600"
            via="via-indigo-600"
            to="to-purple-600"
            className="absolute inset-0"
          />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-white/10 to-transparent rounded-full"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-white/5 to-transparent rounded-full"
            />
          </div>

          <CardContent className="relative z-10 p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6"
            >
              <Rocket className="h-10 w-10 text-white" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              今すぐLarkで業務効率を革新しましょう
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              {annualSavings && employeeCount 
                ? `${employeeCount}名規模で年間${formatCurrency(annualSavings)}の削減効果を実現`
                : '50名規模で年間¥2,508,000の削減効果を実現'
              }
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredButton('install')}
                onHoverEnd={() => setHoveredButton(null)}
              >
                <Button
                  onClick={handleLarkInstall}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90 font-bold px-8 py-4 text-lg shadow-xl relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                    initial={{ x: '-100%' }}
                    animate={{ x: hoveredButton === 'install' ? '100%' : '-100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <Rocket className="h-5 w-5" />
                    今すぐ無料で始める
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredButton('consultation')}
                onHoverEnd={() => setHoveredButton(null)}
              >
                <Button
                  onClick={handleConsultation}
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 text-lg backdrop-blur-sm"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  専門家に相談する
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-blue-50">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="inline-flex items-center gap-2 mb-4"
              >
                <Sparkles className="h-6 w-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-slate-900">
                  Larkを選ぶ理由
                </h3>
              </motion.div>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                世界中の企業が選ぶ、次世代のワークプラットフォーム
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <benefit.icon className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {benefit.title}
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Consultation Banner */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Card className="border-0 shadow-xl bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-l-emerald-500">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="flex-shrink-0"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
              </motion.div>

              <div className="flex-1">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-2xl font-bold text-slate-900 mb-3"
                >
                  専門家による無料コンサルテーション
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="text-slate-600 mb-6 text-lg leading-relaxed"
                >
                  あなたの組織に最適な導入プランを、Lark認定エキスパートが無料でご提案します。
                  導入から運用まで、成功への道筋を一緒に描きましょう。
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
                >
                  {consultationFeatures.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-700">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  <Button
                    onClick={handleConsultation}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    今すぐ相談予約
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 1.5 }}
        className="text-center"
      >
        <Card className="bg-slate-50/50 border-slate-200/50">
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              <Star className="h-4 w-4 text-yellow-500 inline mr-1" />
              30日間の無料トライアル期間中はいつでもキャンセル可能です。
              クレジットカード情報の登録は不要です。
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}