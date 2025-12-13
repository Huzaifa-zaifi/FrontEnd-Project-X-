import React, { useEffect, useRef } from 'react'

const ActivityChart = ({ data = [], months = [] }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.parentElement.offsetWidth
    const height = 300

    canvas.width = width
    canvas.height = height

    const maxValue = Math.max(...data, 1)
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2
    const barWidth = chartWidth / months.length
    const barSpacing = barWidth * 0.2

    // Draw background
    ctx.fillStyle = '#F9FAFB'
    ctx.fillRect(0, 0, width, height)

    // Draw grid lines
    ctx.strokeStyle = '#E5E7EB'
    ctx.lineWidth = 1
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Draw bars
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight
      const x = padding + index * barWidth + barSpacing / 2
      const y = height - padding - barHeight

      ctx.fillStyle = '#6B7280'
      ctx.fillRect(x, y, barWidth - barSpacing, barHeight)

      // Draw labels
      ctx.fillStyle = '#6B7280'
      ctx.font = '11px "Open Sans", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(months[index], x + (barWidth - barSpacing) / 2, height - padding + 20)
    })

    // Draw Y-axis labels
    ctx.fillStyle = '#9CA3AF'
    ctx.font = '11px "Open Sans", sans-serif'
    ctx.textAlign = 'right'
    for (let i = 0; i <= 4; i++) {
      const value = Math.round((maxValue / 4) * (4 - i))
      const y = padding + (chartHeight / 4) * i
      ctx.fillText(value.toString(), padding - 10, y + 4)
    }
  }, [data, months])

  return (
    <div className="h-[300px] relative">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

export default ActivityChart

