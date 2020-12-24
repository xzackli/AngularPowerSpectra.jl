var documenterSearchIndex = {"docs":
[{"location":"","page":"Home","title":"Home","text":"CurrentModule = AngularPowerSpectra","category":"page"},{"location":"#AngularPowerSpectra","page":"Home","title":"AngularPowerSpectra","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [AngularPowerSpectra]","category":"page"},{"location":"#AngularPowerSpectra.SpectralVector","page":"Home","title":"AngularPowerSpectra.SpectralVector","text":"A SpectralArray is just a 0-based array.\n\n\n\n\n\n","category":"type"},{"location":"#AngularPowerSpectra.compute_covmat_TTTT-Union{Tuple{T}, Tuple{CovarianceWorkspace{T},Any,Any,Any,Any,AngularPowerSpectra.AbstractField{T},AngularPowerSpectra.AbstractField{T},AngularPowerSpectra.AbstractField{T},AngularPowerSpectra.AbstractField{T}}} where T<:Real","page":"Home","title":"AngularPowerSpectra.compute_covmat_TTTT","text":"cov(workspace::CovarianceWorkspace{T}, m_i::Field{T}, m_j::Field{T}, \n    m_p::Field{T}=m_i, m_q::Field{T}=m_j; band=5) where {T <: Real}\n\nCompute the covariance matrix between Cℓ₁(i,j) and Cℓ₂(p,q) for temperature.\n\nArguments\n\nm_i::Field{T}: the array to search\nm_j::Field{T}: the value to search for\n\nKeywords\n\nband::Integer: compute the banded covariance matrix. Set to 0 for just the diagonal.\n\nReturns\n\nSymmetric{Array{T,2}}: covariance\n\n\n\n\n\n","category":"method"},{"location":"#AngularPowerSpectra.get_thread_buffers-Union{Tuple{T}, Tuple{Type{T},Any}} where T","page":"Home","title":"AngularPowerSpectra.get_thread_buffers","text":"Allocate Vector{T} of a given size for each thread.\n\n\n\n\n\n","category":"method"},{"location":"#AngularPowerSpectra.Ξ_EE-Union{Tuple{AA}, Tuple{T}, Tuple{OffsetArrays.OffsetArray{T,1,AA},WignerFamilies.WignerSymbolVector{T,Int64,AA} where AA<:AbstractArray{T,1},Int64,Int64}} where AA where T","page":"Home","title":"AngularPowerSpectra.Ξ_EE","text":"Projector function for EE. Goes into the mode-coupling matrix.\n\nNote that w3j² refers to the square of ( ℓ ℓ₂ ℓ₃ 0 -2 2 )\n\n\n\n\n\n","category":"method"},{"location":"#AngularPowerSpectra.Ξ_TE-Union{Tuple{AA}, Tuple{T}, Tuple{OffsetArrays.OffsetArray{T,1,AA},WignerFamilies.WignerSymbolVector{T,Int64,AA} where AA<:AbstractArray{T,1},Int64,Int64}} where AA where T","page":"Home","title":"AngularPowerSpectra.Ξ_TE","text":"Projector function for TE. Goes into the mode-coupling matrix.\n\nNote that w3j00mul_22 refers to ( ℓ ℓ₂ ℓ₃ 0 0 0 ) × ( ℓ ℓ₂ ℓ₃ 0 -2 2 )\n\n\n\n\n\n","category":"method"},{"location":"#AngularPowerSpectra.Ξ_TT-Union{Tuple{AA}, Tuple{T}, Tuple{OffsetArrays.OffsetArray{T,1,AA},WignerFamilies.WignerSymbolVector{T,Int64,AA} where AA<:AbstractArray{T,1},Int64,Int64}} where AA where T","page":"Home","title":"AngularPowerSpectra.Ξ_TT","text":"Projector function for TT. Goes into the mode-coupling matrix.\n\n\n\n\n\n","category":"method"}]
}