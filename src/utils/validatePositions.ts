import { positions } from '@/data/positions'
import type { StyleType, DifficultyLevel } from '@/types'

// Data integrity validation
export const validatePositionDatabase = () => {
  console.log('🔍 Validating Position Database...')
  
  // Check total count
  const totalCount = positions.length
  console.log(`📊 Total positions: ${totalCount}`)
  
  // Check for duplicate IDs
  const ids = positions.map(p => p.id)
  const uniqueIds = new Set(ids)
  const hasDuplicates = ids.length !== uniqueIds.size
  
  if (hasDuplicates) {
    console.error('❌ Duplicate IDs found!')
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index)
    console.error('Duplicate IDs:', [...new Set(duplicates)])
  } else {
    console.log('✅ All IDs are unique')
  }
  
  // Check style distribution
  const styleDistribution: Record<StyleType, number> = {
    romantic: 0,
    passionate: 0,
    adventurous: 0,
    mixed: 0
  }
  
  positions.forEach(pos => {
    styleDistribution[pos.style]++
  })
  
  console.log('🎨 Style Distribution:')
  Object.entries(styleDistribution).forEach(([style, count]) => {
    const percentage = ((count / totalCount) * 100).toFixed(1)
    console.log(`  ${style}: ${count} (${percentage}%)`)
  })
  
  // Check difficulty distribution
  const difficultyDistribution: Record<DifficultyLevel, number> = {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
    expert: 0
  }
  
  positions.forEach(pos => {
    difficultyDistribution[pos.difficulty]++
  })
  
  console.log('⚡ Difficulty Distribution:')
  Object.entries(difficultyDistribution).forEach(([difficulty, count]) => {
    const percentage = ((count / totalCount) * 100).toFixed(1)
    console.log(`  ${difficulty}: ${count} (${percentage}%)`)
  })
  
  // Check data completeness
  const incompletePositions = positions.filter(pos => 
    !pos.name || 
    !pos.description || 
    !pos.instructions?.length || 
    !pos.benefits?.length ||
    !pos.tags?.length ||
    pos.rating < 1 || 
    pos.rating > 5 ||
    pos.views < 0
  )
  
  if (incompletePositions.length > 0) {
    console.warn(`⚠️  ${incompletePositions.length} positions have incomplete data`)
  } else {
    console.log('✅ All positions have complete data')
  }
  
  // Summary
  console.log('\n📈 Database Summary:')
  console.log(`✅ Total Positions: ${totalCount}`)
  console.log(`✅ Target (500+): ${totalCount >= 500 ? 'ACHIEVED' : 'NOT MET'}`)
  console.log(`✅ Unique IDs: ${hasDuplicates ? 'FAILED' : 'PASSED'}`)
  console.log(`✅ Complete Data: ${incompletePositions.length === 0 ? 'PASSED' : 'SOME ISSUES'}`)
  
  return {
    totalCount,
    hasUniqueIds: !hasDuplicates,
    styleDistribution,
    difficultyDistribution,
    isComplete: incompletePositions.length === 0,
    meetsTarget: totalCount >= 500
  }
}

// Quick validation function for console
if (typeof window === 'undefined') {
  // Only run in Node.js environment
  validatePositionDatabase()
}