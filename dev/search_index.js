var documenterSearchIndex = {"docs":
[{"location":"spectra/","page":"Spectra","title":"Spectra","text":"CurrentModule = AngularPowerSpectra","category":"page"},{"location":"spectra/#Spectral-Analysis","page":"Spectra","title":"Spectral Analysis","text":"","category":"section"},{"location":"spectra/","page":"Spectra","title":"Spectra","text":"using Healpix\nusing AngularPowerSpectra\n\n# make up a trivial mask of ones\nnside = 256\nmask = readMapFromFITS(\"test/data/example_mask_1.fits\", 1, Float64)\nflat_mask = Map{Float64, RingOrder}(ones(nside2npix(nside)) )\n\n# pretend we are computing 143 GHz fields between two half-missions, hm1 and hm2\nm1 = PolarizedField(\"143_hm1\",  flat_mask, flat_mask)\nm2 = PolarizedField(\"143_hm2\", flat_mask, flat_mask)\nworkspace = SpectralWorkspace(m1, m2)\n\n# compute the mode-coupling matrix\nM = mcm(workspace, TT, \"143_hm1\", \"143_hm2\")\nCl_hat = spectra_from_masked_maps(map1 * mask, map1 * mask, lu(M.parent), flat_beam, flat_beam)","category":"page"},{"location":"covariance/","page":"Covariance","title":"Covariance","text":"CurrentModule = AngularPowerSpectra","category":"page"},{"location":"covariance/#Covariance-Estimation","page":"Covariance","title":"Covariance Estimation","text":"","category":"section"},{"location":"covariance/","page":"Covariance","title":"Covariance","text":"(interface needs to be cleaned up)","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = AngularPowerSpectra","category":"page"},{"location":"#AngularPowerSpectra","page":"Home","title":"AngularPowerSpectra","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"AngularPowerSpectra.jl computes mode-coupling matrices and covariance matrices for TT, TE, and EE spectra, using pseudo-C_ell methods (i.e. Hivon et al. 2002, Efstathiou 2006).","category":"page"},{"location":"#Index","page":"Home","title":"Index","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [AngularPowerSpectra]","category":"page"},{"location":"#AngularPowerSpectra.mcm-Union{Tuple{T}, Tuple{SpectralWorkspace{T},AngularPowerSpectra.MapType,String,String}} where T","page":"Home","title":"AngularPowerSpectra.mcm","text":"mcm(workspace::SpectralWorkspace{T}, spec::MapType, f1_name::String, f2_name::String) where {T}\n\nArguments:\n\nworkspace::SpectralWorkspace{T}: stores the SHTs of the masks\nspec::MapType: the spectrum to compute\nf1_name::String: the name of the first field\nf2_name::String: the name of the second field\n\nReturns:\n\nSpectralArray{T,2}: zero-indexed array containing the mode-coupling matrix\n\nExamples\n\nm1 = PolarizedField(\"field1\", mask1_T, mask1_P)\nm2 = PolarizedField(\"field2\", mask2_T, mask2_P)\nworkspace = SpectralWorkspace(m1, m2)\n𝐌 = mcm(workspace, spec, \"field1\", \"field2\")\n\n\n\n\n\n","category":"method"},{"location":"#AngularPowerSpectra.spectra_from_masked_maps-Union{Tuple{T}, Tuple{Healpix.Map{T,O,AA} where AA<:AbstractArray{T,1} where O<:Healpix.Order,Healpix.Map{T,O,AA} where AA<:AbstractArray{T,1} where O<:Healpix.Order,LinearAlgebra.Factorization,OffsetArrays.OffsetArray{T,1,AA} where AA<:AbstractArray,OffsetArrays.OffsetArray{T,1,AA} where AA<:AbstractArray}} where T","page":"Home","title":"AngularPowerSpectra.spectra_from_masked_maps","text":"spectra_from_masked_maps(...)\n\nArguments:\n\nmap_1::Map{T}: masked map\nmap_2::Map{T}: masked map\nBℓ_1::SpectralVector{T}: beam associated with first map\nBℓ_2::SpectralVector{T}: beam associated with second map\n\nReturns:\n\nArray{T,1}: spectrum\n\n\n\n\n\n","category":"method"},{"location":"#AngularPowerSpectra.synalm!-Union{Tuple{T}, Tuple{Random.AbstractRNG,AbstractArray{T,3},Array{T,1} where T}} where T","page":"Home","title":"AngularPowerSpectra.synalm!","text":"synalm!([rng=GLOBAL_RNG], Cl::AbstractArray{T,3}, alms::Vector{Alm{Complex{T}}}) where T\n\nIn-place synthesis of spherical harmonic coefficients, given spectra.\n\nArguments:\n\nCl::AbstractArray{T,3}: array with dimensions of comp, comp, ℓ\nalms::Vector: array of Alm to fill\n\nExamples\n\nnside = 16\nC0 = [3.  2.;  2.  5.]\nCl = repeat(C0, 1, 1, 3nside)  # spectra constant with ℓ\nalms = [Alm{Complex{Float64}}(3nside-1, 3nside-1) for i in 1:2]\nsynalm!(Cl, alms)\n\n\n\n\n\n","category":"method"},{"location":"#AngularPowerSpectra.synalm-Union{Tuple{T}, Tuple{Random.AbstractRNG,AbstractArray{T,3},Int64}} where T","page":"Home","title":"AngularPowerSpectra.synalm","text":"synalm([rng=GLOBAL_RNG], Cl::AbstractArray{T,3}, nside::Int) where T\n\nArguments:\n\nCl::AbstractArray{T,3}: array with dimensions of comp, comp, ℓ\nnside::Int: healpix resolution\n\nReturns:\n\nVector{Alm{T}}: spherical harmonics realizations for each component\n\nExamples\n\nnside = 16\nC0 = [3.  2.;  2.  5.]\nCl = repeat(C0, 1, 1, 3nside)  # spectra constant with ℓ\nalms = synalm(Cl, nside)\n\n\n\n\n\n","category":"method"}]
}
