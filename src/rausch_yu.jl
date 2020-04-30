
function ms_transpose!(R::Array{T,2}) where T
    @inbounds for i in 1:3
        for j in i:3
            temp = R[j,i]
            R[j,i] = R[i,j]
            R[i,j] = temp
        end
    end
end

function ms_column_swap!(R::Array{T,2}, i, j) where T
    @inbounds for k in 1:3
        temp = R[k,i]
        R[k,i] = R[k,j]
        R[k,j] = temp
    end
end

function ms_row_swap!(R::Array{T,2}, i, j) where T
    @inbounds for k in 1:3
        temp = R[i,k]
        R[i,k] = R[j,k]
        R[j,k] = temp
    end
end

function ms_row_argmax(a::T,b::T,c::T) where T
    if a ≥ b && a ≥ c
        return 1
    elseif b ≥ a && b ≥ c
        return 2
    else
        return 3
    end
end

function ms_row_argmin(a::T,b::T,c::T) where T
    if a ≤ b && a ≤ c
        return 1
    elseif b ≤ a && b ≤ c
        return 2
    else
        return 3
    end
end

function SL_row_to_top!(R::Array{T,2}, S, L) where T
    if SL_in_row(R, S, L, 1)
        return
    elseif SL_in_row(R, S, L, 2)
        ms_row_swap!(R,1,2)
    elseif SL_in_row(R, S, L, 3)
        ms_row_swap!(R,1,3)
    end
end

# check if both S and L are in row i
SL_in_row(R, S, L, i) = ((S == R[i,1] || S == R[i,2] || S == R[i,3]) && 
                         (L == R[i,1] || L == R[i,2] || L == R[i,3]))
 
function SL_form!(R::Array{T,2}) where T
    S = minimum(R)
    L = maximum(R)

    # move S and L into first row
    SL_row_to_top!(R, S, L)
    if !SL_in_row(R, S, L, 1)
        ms_transpose!(R)
        SL_row_to_top!(R, S, L)
    end
    
    # move S into the first column 
    S_col = argmin((R[1,1], R[1,2], R[1,3]))#ms_row_argmin(R[1,1], R[1,2], R[1,3])
    if S_col != 1
        ms_column_swap!(R, 1, S_col)
    end
    # move L into the second column
    if L != R[1,2]
        ms_column_swap!(R, 2, 3)
    end

    if R[2,2] < R[3,2]
        return
    elseif R[2,2] == R[3,2]
        # now require R₂₃ ≤ R₃₃
        if R[2,3] ≤ R[3,3]
            return
        else
            ms_row_swap!(R,2,3)
        end
    else  # R[2,2] > R[3,2]
        ms_row_swap!(R,2,3)
    end
end

function Regge_variables!(R::Array{Tint,2}, 
                          j₁::Tint, j₂::Tint, j₃::Tint, 
                          m₁::Tint, m₂::Tint, m₃::Tint) where {Tint <: Integer}
    R[1,1] = -j₁+j₂+j₃
    R[1,2] = j₁-j₂+j₃
    R[1,3] = j₁+j₂-j₃
    R[2,1] = j₁-m₁
    R[2,2] = j₂-m₂
    R[2,3] = j₃-m₃
    R[3,1] = j₁+m₁
    R[3,2] = j₂+m₂
    R[3,3] = j₃+m₃
    SL_form!(R)
    vars = (R[1,2], R[2,1], R[3,3], R[2,2], R[1,1])
    @assert vars[1] ≥ vars[2] ≥ vars[3] ≥ vars[4] ≥ vars[5]
    @inbounds return vars  # L, X, T, B, S
end

function Rasch_Yu_index!(indextype::Type{<:Integer}, R::Array{Tint,2}, 
                        j₁, j₂, j₃, m₁, m₂, m₃) where {Tint <: Integer}
    L, X, T, B, S = indextype.(Regge_variables!(R, j₁, j₂, j₃, m₁, m₂, m₃))
    c = convert(indextype, ceil(
        L * (24 + L * (50 + L * (35 + L * (10 + L)))) / 120 + 
        X * (6 + (X * (11 + X * (6 + X)))) / 24 +
        T * (2 + T * (3 + T)) / 6 + B * (B + 1) / 2 + S + 1))
    return c
end

function Rasch_Yu_index(indextype::Type{<:Integer}, j₁, j₂, j₃, m₁, m₂, m₃)
    R = zeros(Int, (3,3))
    Rasch_Yu_index!(indextype, R, j₁, j₂, j₃, m₁, m₂, m₃)
end


function confirm_symmetry(maxj)
    j₁, j₂ = rand(0:maxj, 2)
    j₃ = rand(abs(j₁ - j₂):(j₁ + j₂))
    if isodd(j₁ + j₂ + j₃)
        j₃ += 1
    end
    m₁, m₂, m₃ = 0, 0, 0
    c1 = Rasch_Yu_index(Int128, j₁, j₂, j₃, m₁, m₂, m₃)

    c2 = Rasch_Yu_index(Int128, 
        j₁, (j₂ + j₃ - m₁)/2, (j₂ + j₃ + m₁)/2, 
        j₃ - j₂, (j₂ - j₃ - m₁)/2 - m₃, (j₂ - j₃ + m₁)/2 + m₃)

    c1, c2
end
      
"""
Evens out an array which scales linearly with difficulty by swapping elements such that
[1,2,3,4,5,6] is mapped to [1,6,2,5,3,4].
"""
function swap_triangular(arr)
    swapped = similar(arr)
    counter = 1
    n = length(arr)
    for i in 1:n
        swapped[i] = isodd(i) ? arr[div(i,2)+1] : arr[n + 1 - div(i+1,2)]
    end
    swapped
end
