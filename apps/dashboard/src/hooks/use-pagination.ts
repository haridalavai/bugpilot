import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

interface PaginationMetadata {
  total: number
  page: number
  limit: number
  hasMore: boolean
}

interface UsePaginationProps {
  defaultLimit?: number
  defaultPage?: number
}

export function usePagination({ defaultLimit = 10, defaultPage = 1 }: UsePaginationProps = {}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get initial values from URL or use defaults
  const page = Number(searchParams.get("page")) || defaultPage
  const limit = Number(searchParams.get("limit")) || defaultLimit

  const [metadata, setMetadata] = useState<PaginationMetadata>({
    total: 0,
    page,
    limit,
    hasMore: false,
  })

  // Update URL parameters
  const updateQueryParams = useCallback((newPage: number, newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    params.set("limit", newLimit.toString())
    router.push(`?${params.toString()}`)
  }, [router, searchParams])

  // Handle page change
  const handlePageChange = useCallback((newPage: number) => {
    updateQueryParams(newPage, metadata.limit)
  }, [metadata.limit, updateQueryParams])

  // Handle limit change
  const handleLimitChange = useCallback((newLimit: number) => {
    // Reset to first page when changing limit
    updateQueryParams(1, newLimit)
  }, [updateQueryParams])

  // Update metadata from server response
  const updateMetadata = useCallback((newMetadata: Partial<PaginationMetadata>) => {
    setMetadata(prev => ({
      ...prev,
      ...newMetadata,
    }))
  }, [])

  // Sync with URL parameters when they change
  useEffect(() => {
    setMetadata(prev => ({
      ...prev,
      page,
      limit,
    }))
  }, [page, limit])

  return {
    metadata,
    handlePageChange,
    handleLimitChange,
    updateMetadata,
  }
} 