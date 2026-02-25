import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Mountain, MapPin, Users, Menu, X, Youtube, Instagram, ChevronDown, Phone, Mail, Star, Compass, Camera, Car } from "lucide-react"
import { AnimatedText } from "@/components/animated-text"
import { WorldMap } from "@/components/world-map"
import { experiences } from "@/lib/experience-data"
import type { Experience } from "@/lib/experience-data"

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const numericStr = value.replace(/[^0-9.]/g, "")
          const targetNum = Number.parseFloat(numericStr)
          const unit = value.replace(/[0-9.]/g, "")

          let current = 0
          const increment = targetNum / 60
          const interval = setInterval(() => {
            current += increment
            if (current >= targetNum) {
              setDisplayValue(`${targetNum}${unit}`)
              clearInterval(interval)
            } else {
              setDisplayValue(`${current.toFixed(1)}${unit}`.replace(".0", ""))
            }
          }, 16)

          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div className="text-8xl" ref={ref}>
      {displayValue}
    </div>
  )
}

export default function AltaiPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [selectedFeature, setSelectedFeature] = useState(0)
  const [imageFade, setImageFade] = useState(true)
  const [autoRotationKey, setAutoRotationKey] = useState(0)
  const [dynamicWordIndex, setDynamicWordIndex] = useState(0)
  const [wordFade, setWordFade] = useState(true)
  const [dashboardScrollOffset, setDashboardScrollOffset] = useState(0)
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const dynamicWords = ["горы", "реки", "тайгу", "Алтай", "перевалы", "долины", "природу"]

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordFade(false)
      setTimeout(() => {
        setDynamicWordIndex((prev) => (prev + 1) % dynamicWords.length)
        setWordFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(wordInterval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      if (dashboardRef.current) {
        const dashboardRect = dashboardRef.current.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        const rotationStart = viewportHeight * 0.8
        const rotationEnd = viewportHeight * 0.2

        if (dashboardRect.top >= rotationStart) {
          setDashboardScrollOffset(0)
        } else if (dashboardRect.top <= rotationEnd) {
          setDashboardScrollOffset(15)
        } else {
          const scrollRange = rotationStart - rotationEnd
          const currentProgress = rotationStart - dashboardRect.top
          const rotationProgress = currentProgress / scrollRange
          const tiltAngle = rotationProgress * 15
          setDashboardScrollOffset(tiltAngle)
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsLoaded(true)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const featuresCount = 4

    const interval = setInterval(() => {
      setImageFade(false)
      setTimeout(() => {
        setSelectedFeature((prev) => (prev + 1) % featuresCount)
        setImageFade(true)
      }, 300)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoRotationKey])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-[#0B0C0F] text-[#F2F3F5] overflow-x-hidden">
      <header className="fixed top-6 left-6 md:w-auto md:right-auto right-6 z-40 border border-white/10 backdrop-blur-md bg-[#0B0C0F]/80 rounded-[16px]">
        <div className="w-full mx-auto px-6">
          <div className="flex items-center gap-6 md:h-14 h-14">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-lg md:text-xl font-semibold font-mono hover:text-emerald-400 transition-colors duration-300"
            >
              АЛТАЙ·ТУР
            </button>

            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("services")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Услуги
              </button>
              <button
                onClick={() => scrollToSection("map")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Маршруты
              </button>
              <button
                onClick={() => scrollToSection("narrative")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                О нас
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Вопросы
              </button>
              <button
                onClick={() => scrollToSection("cta")}
                className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors duration-300"
              >
                Записаться
              </button>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-auto p-2 hover:bg-white/5 rounded-lg transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#0B0C0F]/95 backdrop-blur-md z-50 flex flex-col items-start justify-end pb-20 pt-20 px-6">
          <div className="flex flex-col gap-8 items-start text-left w-full">
            <button
              onClick={() => scrollToSection("services")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-emerald-400 transition-colors duration-300"
            >
              Услуги
            </button>
            <button
              onClick={() => scrollToSection("map")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-emerald-400 transition-colors duration-300"
            >
              Маршруты
            </button>
            <button
              onClick={() => scrollToSection("narrative")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-emerald-400 transition-colors duration-300"
            >
              О нас
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-emerald-400 transition-colors duration-300"
            >
              Вопросы
            </button>
            <button
              onClick={() => scrollToSection("cta")}
              className="font-serif text-5xl md:text-7xl font-light text-[#F2F3F5] hover:text-emerald-400 transition-colors duration-300"
            >
              Записаться
            </button>
          </div>
        </div>
      )}

      {/* HERO */}
      <section
        ref={heroRef}
        className={`relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isLoaded ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"}`}
        style={{
          backgroundImage: `url('/hero-landscape.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            backgroundImage: `url('/hero-landscape.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0F] via-[#0B0C0F]/60 to-transparent pointer-events-none" />

        <div
          className="max-w-[1120px] w-full mx-auto relative z-10"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 glass-pill px-4 py-2 rounded-full mb-8 text-xs md:text-sm text-[#A7ABB3] stagger-reveal" style={{ animationDelay: "0ms" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Горный Алтай · Авторские туры
            </div>
            <h1 className="font-serif text-[44px] leading-[1.1] md:text-[72px] md:leading-[1.05] font-medium mb-6 text-balance">
              <span
                className={`block stagger-reveal text-7xl font-light transition-all duration-500 md:text-8xl ${
                  wordFade ? "opacity-100 blur-0" : "opacity-0 blur-lg"
                }`}
              >
                Открываем <AnimatedText key={dynamicWordIndex} text={dynamicWords[dynamicWordIndex]} delay={0} />
              </span>
              <span className="block stagger-reveal text-7xl font-light md:text-8xl" style={{ animationDelay: "90ms" }}>
                вместе
              </span>
            </h1>
            <p
              className="text-[#A7ABB3] text-base md:text-lg max-w-[540px] mx-auto mb-8 leading-relaxed stagger-reveal text-white"
              style={{ animationDelay: "180ms" }}
            >
              Экскурсии, многодневные туры, мастер-классы и трансфер по Горному Алтаю. Покажем вам настоящий Алтай — без туристических толп и шаблонных маршрутов.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 stagger-reveal" style={{ animationDelay: "270ms" }}>
              <Button
                onClick={() => scrollToSection("cta")}
                className="glass-button px-8 py-6 text-base rounded-full bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-600/30 hover:border-emerald-400/50 transition-all duration-300 text-white"
              >
                Забронировать тур
              </Button>
              <Button
                onClick={() => scrollToSection("services")}
                className="glass-button px-8 py-6 text-base rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-white"
              >
                Наши услуги
              </Button>
            </div>
          </div>

          <div className="mt-12 md:mt-20 stagger-reveal" style={{ animationDelay: "360ms" }} ref={dashboardRef}>
            <div style={{ perspective: "1200px" }}>
              <div
                className="relative aspect-[16/10] md:aspect-[16/9] rounded-[24px] overflow-hidden"
                style={{
                  transform: `rotateX(${dashboardScrollOffset}deg)`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.05s linear",
                }}
              >
                <img
                  src="/dashboard-screenshot.png"
                  alt="Горный Алтай — туры и экскурсии"
                  className="object-cover dashboard-image w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-20 md:py-32 px-4 animate-on-scroll md:pt-24 md:pb-20">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ЧТО МЫ ПРЕДЛАГАЕМ
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
              Все виды{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #6ee7b7 0%, #a7f3d0 50%, #d1fae5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                услуг
              </span>{" "}
              на Алтае
            </h2>
            <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
              От однодневных экскурсий до многодневных экспедиций — организуем любое путешествие по Горному Алтаю
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Mountain,
                title: "Многодневные туры",
                desc: "Экспедиции от 2 до 14 дней по ключевым местам Алтая: Катунь, Чуйский тракт, Телецкое озеро, Белуха",
                badge: "Хит",
                color: "emerald",
              },
              {
                icon: Compass,
                title: "Экскурсии",
                desc: "Однодневные маршруты к водопадам, перевалам, петроглифам и смотровым площадкам",
                badge: "",
                color: "teal",
              },
              {
                icon: Star,
                title: "Мастер-классы",
                desc: "Алтайская кухня, войлоковаление, игра на топшуре, шаманские практики и фото-туры",
                badge: "Новинка",
                color: "emerald",
              },
              {
                icon: Car,
                title: "Трансфер",
                desc: "Трансфер из Горно-Алтайска, Бийска и Барнаула. Заброска в труднодоступные места на внедорожниках",
                badge: "",
                color: "teal",
              },
              {
                icon: MapPin,
                title: "Заброски",
                desc: "Доставка в базовые лагеря, к перевалам и в горную глушь для трекинга и альпинизма",
                badge: "",
                color: "emerald",
              },
              {
                icon: Camera,
                title: "Фото-туры",
                desc: "Авторские маршруты для фотографов: рассветы над Катунью, звёздное небо, дикая природа Алтая",
                badge: "",
                color: "teal",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="relative p-6 md:p-8 border border-white/10 rounded-2xl hover:border-emerald-500/30 transition-all duration-300 group"
              >
                {service.badge && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded-full text-[10px] text-emerald-400 uppercase tracking-wider">
                    {service.badge}
                  </div>
                )}
                <service.icon
                  className={`w-8 h-8 mb-4 text-emerald-400/70 group-hover:text-emerald-400 transition-colors duration-300`}
                />
                <h3 className="text-lg md:text-xl font-medium mb-3">{service.title}</h3>
                <p className="text-sm md:text-base text-[#A7ABB3] leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section id="metrics" className="relative py-20 md:py-32 px-4 animate-on-scroll md:pt-24 md:pb-20 border-t border-white/5">
        <div className="max-w-[1120px] w-full mx-auto">
          <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 md:mb-8 text-center text-balance">
            Алтай в{" "}
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #6ee7b7 0%, #d1fae5 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              цифрах
            </span>
          </h2>

          <p className="text-[#A7ABB3] text-sm md:text-base mb-12 md:mb-16 text-center max-w-[600px] mx-auto leading-relaxed">
            Проводим туры по Горному Алтаю уже несколько лет. Нам доверяют путешественники из разных городов России.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-[800px] mx-auto">
            {[
              { label: "ДОВОЛЬНЫХ ТУРИСТОВ", value: "1200+", desc: "за всё время работы", color: "emerald" },
              { label: "АВТОРСКИХ МАРШРУТОВ", value: "35+", desc: "по всему Алтаю", color: "teal" },
              { label: "ЛЕТ НА АЛТАЕ", value: "8+", desc: "живём и работаем здесь", color: "emerald" },
              { label: "РЕЙТИНГ НА ОТЗОВИКАХ", value: "4.9", desc: "из 5 звёзд", color: "teal" },
            ].map((metric, i) => (
              <div
                key={i}
                className="p-6 md:p-10 text-center border border-white/10 border-t-0 border-b border-l-0 border-r-0 md:py-10 md:pb-20"
              >
                <div
                  className={`text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-4 flex items-center justify-center gap-2`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${metric.color === "emerald" ? "bg-emerald-400/60" : "bg-teal-400/60"}`}
                  />
                  {metric.label}
                </div>
                <div className="font-serif text-[48px] md:text-[72px] leading-none font-medium">
                  <AnimatedCounter value={metric.value} />
                </div>
                <div className="text-[11px] md:text-xs text-[#A7ABB3] mt-3">{metric.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      <section id="map" className="relative py-20 md:py-32 animate-on-scroll bg-[#0B0C0F]">
        <div className="text-center mb-12 md:mb-16 px-4">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            НАШИ МАРШРУТЫ
          </div>
          <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
            Маршруты по Алтаю
          </h2>
          <p className="text-[#A7ABB3] text-sm md:text-base max-w-[600px] mx-auto leading-relaxed">
            От Бийска до подножия Белухи — знаем каждую дорогу, перевал и тропу
          </p>
        </div>

        <WorldMap
          experiences={experiences}
          selectedExperience={selectedExperience}
          onSelectExperience={setSelectedExperience}
        />
      </section>

      {/* NARRATIVE / ABOUT */}
      <section id="narrative" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-stretch">
            <div className="max-w-[720px]">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                О НАС
              </div>
              <h2 className="font-serif text-[36px] leading-[1.15] md:text-[56px] md:leading-[1.1] font-medium mb-8 text-balance">
                Мы живём{" "}
                <span
                  className="inline-block"
                  style={{
                    background: "linear-gradient(135deg, #6ee7b7 0%, #d1fae5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  здесь
                </span>
              </h2>
              <p className="text-[#A7ABB3] text-base md:text-lg leading-relaxed mb-12">
                Мы — местные жители Горного Алтая. Не агентство из Москвы, не перекупщики туров. Мы знаем каждый перевал, каждую тропу и каждого пастуха на нашем маршруте. Это даёт нам то, чего нет у других — настоящий Алтай.
              </p>

              <div className="md:hidden mb-8">
                <div className="rounded-[24px] p-1 w-full aspect-square overflow-hidden">
                  <img
                    src={
                      [
                        "/drone.png",
                        "/real-time-satellite.png",
                        "/biodiversity-tracking.png",
                        "/deforestation-detect.png",
                      ][selectedFeature] || "/placeholder.svg"
                    }
                    alt="Горный Алтай"
                    className={`w-full h-full object-cover rounded-[20px] transition-opacity duration-300 ${
                      imageFade ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Авторские маршруты",
                    desc: "Составляем маршруты сами — без шаблонов и туристических толп",
                    icon: Compass,
                    image: "/drone.png",
                  },
                  {
                    title: "Местные гиды",
                    desc: "Живём на Алтае, знаем язык, традиции и тайные места",
                    icon: Users,
                    image: "/real-time-satellite.png",
                  },
                  {
                    title: "Фотография природы",
                    desc: "Выбираем лучшие точки и время для съёмки дикой природы",
                    icon: Camera,
                    image: "/biodiversity-tracking.png",
                  },
                  {
                    title: "Безопасность",
                    desc: "Страховки, спутниковая связь, опытные водители и гиды",
                    icon: Mountain,
                    image: "/deforestation-detect.png",
                  },
                ].map((feature, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setImageFade(false)
                      setTimeout(() => {
                        setSelectedFeature(i)
                        setImageFade(true)
                        setAutoRotationKey((prev) => prev + 1)
                      }, 300)
                    }}
                    className={`relative w-full text-left flex gap-4 items-start p-5 transition-all duration-300 rounded-xs py-4 overflow-hidden ${
                      selectedFeature === i ? "border border-white/20" : "border border-white/10"
                    }`}
                  >
                    <feature.icon
                      className={`w-6 h-6 flex-shrink-0 mt-1 transition-colors ${
                        selectedFeature === i ? "text-emerald-400" : "text-emerald-500/60"
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm md:text-base text-[#A7ABB3]">{feature.desc}</p>
                    </div>
                    {selectedFeature === i && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                        <div className="h-full bg-emerald-400/60 progress-bar" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-stretch justify-center">
              <div className="relative w-full h-full min-h-[500px]">
                {[
                  { title: "Авторские маршруты", image: "/drone.png" },
                  { title: "Местные гиды", image: "/real-time-satellite.png" },
                  { title: "Фотография природы", image: "/biodiversity-tracking.png" },
                  { title: "Безопасность", image: "/deforestation-detect.png" },
                ].map((feature, i) => {
                  const positionInStack = (i - selectedFeature + 4) % 4
                  const isActive = positionInStack === 0

                  return (
                    <div
                      key={i}
                      className="absolute inset-0 p-1 transition-all duration-600 ease-out"
                      style={{
                        zIndex: 4 - positionInStack,
                        transform: `translateX(${positionInStack * 16}px) scale(${1 - positionInStack * 0.02})`,
                        opacity: isActive ? (imageFade ? 1 : 1) : 0.6 - positionInStack * 0.15,
                      }}
                    >
                      <img
                        src={feature.image || "/placeholder.svg"}
                        alt={feature.title}
                        className="w-full h-full object-cover rounded-[20px]"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-20 md:py-32 px-4 animate-on-scroll">
        <div className="max-w-[800px] w-full mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <div className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-[#A7ABB3] mb-6 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ЧАСТЫЕ ВОПРОСЫ
            </div>
            <h2 className="font-serif text-[32px] leading-[1.15] md:text-[48px] md:leading-[1.1] font-medium mb-6 text-balance">
              Есть{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(135deg, #6ee7b7 0%, #d1fae5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                вопросы?
              </span>
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                question: "Какое время года лучше для поездки на Алтай?",
                answer:
                  "Лучшее время — с июня по сентябрь. Июль-август — пик сезона: тепло, все перевалы открыты. Июнь и сентябрь — меньше туристов, но нужна тёплая одежда. Зимой проводим снегоходные туры и катание на горных лыжах.",
              },
              {
                question: "Нужна ли специальная физическая подготовка?",
                answer:
                  "Зависит от маршрута. Большинство наших экскурсий подходят для любого уровня подготовки. Для трекингов к Белухе или перевальных походов нужна хорошая физическая форма. Всегда честно скажем, подходит ли маршрут конкретно вам.",
              },
              {
                question: "Как добраться до Горного Алтая?",
                answer:
                  "Ближайшие аэропорты — Горно-Алтайск и Барнаул. Из Барнаула до Горно-Алтайска около 4 часов на автомобиле. Организуем трансфер из любого из этих городов прямо к месту старта вашего тура.",
              },
              {
                question: "Что включено в стоимость тура?",
                answer:
                  "В зависимости от программы: гид, транспорт, проживание в базовых лагерях или гостевых домах, питание на маршруте, страховка. Точный состав всегда указан в описании конкретного тура. Без скрытых доплат.",
              },
              {
                question: "Можно ли заказать индивидуальный тур?",
                answer:
                  "Да, и это одна из наших специализаций. Составим маршрут под ваши интересы: фотография, рыбалка, этнография, треккинг или просто отдых. Напишите нам — обсудим и предложим программу.",
              },
              {
                question: "Как забронировать тур или экскурсию?",
                answer:
                  "Заполните форму на сайте или напишите нам в мессенджер. Уточним детали, количество человек и даты. После согласования — предоплата 30%, остаток при встрече. Отмена без штрафа за 7 дней до начала.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/20"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base md:text-lg font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-[#A7ABB3] transition-transform duration-300 ${
                      openFaqIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === i ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 text-sm md:text-base text-[#A7ABB3] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        className="relative py-24 md:py-40 px-4 animate-on-scroll overflow-hidden pt-0"
        style={{
          backgroundImage: `url('/earth-cta.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C0F] via-[#0B0C0F]/60 to-transparent pointer-events-none" />
        <div className="max-w-[800px] w-full mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 glass-pill px-4 py-2 rounded-full mb-8 text-xs md:text-sm text-[#A7ABB3]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Горный Алтай ждёт
          </div>

          <h2 className="font-serif text-[40px] leading-[1.15] md:text-[64px] md:leading-[1.1] font-medium mb-6 text-balance">
            Готовы к путешествию?
          </h2>
          <p className="text-[#A7ABB3] text-base md:text-lg mb-10 leading-relaxed max-w-[560px] mx-auto">
            Оставьте заявку — расскажем о свободных датах, подберём маршрут и ответим на все вопросы.
          </p>

          <div className="glass-card rounded-2xl p-8 max-w-[480px] mx-auto text-left">
            <h3 className="text-lg font-medium mb-6">Оставить заявку</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-[#F2F3F5] placeholder-[#A7ABB3] focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 transition-all"
              />
              <input
                type="tel"
                placeholder="Телефон или WhatsApp"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-[#F2F3F5] placeholder-[#A7ABB3] focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 transition-all"
              />
              <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-[#A7ABB3] focus:outline-none focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 transition-all appearance-none">
                <option value="">Что вас интересует?</option>
                <option value="tour">Многодневный тур</option>
                <option value="excursion">Однодневная экскурсия</option>
                <option value="masterclass">Мастер-класс</option>
                <option value="transfer">Трансфер / заброска</option>
                <option value="photo">Фото-тур</option>
                <option value="custom">Индивидуальный маршрут</option>
              </select>
              <button className="w-full py-3 bg-emerald-600/30 border border-emerald-500/40 hover:bg-emerald-600/40 hover:border-emerald-400/60 transition-all duration-300 rounded-xl text-sm font-medium text-white">
                Отправить заявку
              </button>
            </div>
            <p className="text-xs text-[#A7ABB3] mt-4 text-center">Ответим в течение 2 часов в рабочее время</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative px-4 border-t border-white/5 py-8">
        <div className="max-w-[1120px] w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold font-mono text-emerald-400">АЛТАЙ·ТУР</div>
              <p className="text-xs text-[#A7ABB3] leading-relaxed">
                Авторские туры и экскурсии по Горному Алтаю. Живём здесь — знаем каждую тропу.
              </p>
              <div className="flex items-center gap-4 mt-2">
                <a href="#" className="text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors" aria-label="ВКонтакте">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 14.378c.522.51.522 1.078.022 1.6-.5.522-1.067.522-1.589 0l-1.6-1.6-1.6 1.6c-.522.522-1.089.522-1.589 0-.5-.522-.5-1.09 0-1.6l1.6-1.6-1.6-1.6c-.5-.522-.5-1.09 0-1.589.5-.5 1.067-.5 1.589 0l1.6 1.6 1.6-1.6c.522-.5 1.09-.5 1.589 0 .5.5.5 1.067 0 1.589l-1.6 1.6 1.578 1.6z" />
                  </svg>
                </a>
                <a href="#" className="text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Услуги</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Многодневные туры</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Экскурсии</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Мастер-классы</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Трансфер и заброски</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Фото-туры</a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Маршруты</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Чуйский тракт</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Телецкое озеро</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Белуха</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Катунь и Мультинские озёра</a>
                <a href="#" className="text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">Каракольские озёра</a>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-xs uppercase tracking-[0.15em] text-[#F2F3F5] font-semibold mb-2">Контакты</div>
              <div className="flex flex-col gap-3">
                <a href="tel:+7" className="flex items-center gap-2 text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                  +7 (XXX) XXX-XX-XX
                </a>
                <a href="mailto:info@altai-tur.ru" className="flex items-center gap-2 text-sm text-[#A7ABB3] hover:text-[#F2F3F5] transition-colors">
                  <Mail className="w-3.5 h-3.5" />
                  info@altai-tur.ru
                </a>
                <div className="flex items-center gap-2 text-sm text-[#A7ABB3]">
                  <MapPin className="w-3.5 h-3.5" />
                  Горно-Алтайск, Республика Алтай
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="email"
                  placeholder="Email для рассылки"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-[#F2F3F5] placeholder-[#A7ABB3] focus:outline-none focus:border-emerald-400/50 transition-all mb-2"
                />
                <button className="w-full px-4 py-2 border rounded-lg text-xs font-medium hover:bg-emerald-600/20 hover:border-emerald-500/50 transition-all bg-emerald-800/20 border-emerald-700/30 text-white">
                  Подписаться на новости
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#A7ABB3]">
            <div>© 2025 АЛТАЙ·ТУР. Все права защищены.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#F2F3F5] transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-[#F2F3F5] transition-colors">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
