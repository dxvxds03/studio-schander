'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FlowerIcon from './FlowerIcon'
import ClientBadge from './ClientBadge'
import Arrow from './Arrow'

interface HeroProject {
  slug: string
  id: number
  title: string
  cover_image: string | null
  link: string | null
  tags: string[]
  show_in_carousel?: boolean
  project_type?: 'client' | 'schander' | 'personal' | null
  client?: string | null
}