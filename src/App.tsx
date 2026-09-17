import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import TargetCursor from './components/ui/TargetCursor'
import { HomePage } from './pages/HomePage'

const ParticipationDetailPage = lazy(() =>
  import('./pages/ParticipationDetailPage').then((m) => ({ default: m.ParticipationDetailPage }))
)

function App() {
  return (
    <>
      <TargetCursor
        targetSelector=".cursor-target, [data-hover]"
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        cursorColor="#F4F3EF"
        cursorColorOnTarget="#E2661F"
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/partisipasi/:categoryId"
          element={
            <Suspense fallback={null}>
              <ParticipationDetailPage />
            </Suspense>
          }
        />
      </Routes>
    </>
  )
}

export default App