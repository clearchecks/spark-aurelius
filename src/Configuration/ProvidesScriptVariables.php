<?php

namespace Laravel\Spark\Configuration;

use Illuminate\Support\Facades\Auth;
use Laravel\Cashier\Cashier;
use Laravel\Spark\Contracts\InitialFrontendState;
use Laravel\Spark\Spark;

trait ProvidesScriptVariables
{
    /**
     * Get the default JavaScript variables for Spark.
     *
     * @return array
     */
    public static function scriptVariables()
    {
        return [
            'cardUpFront' => Spark::needsCardUpFront(),
            'collectsBillingAddress' => Spark::collectsBillingAddress(),
            'collectsEuropeanVat' => Spark::collectsEuropeanVat(),
            'createsAdditionalTeams' => Spark::createsAdditionalTeams(),
            'csrfToken' => csrf_token(),
            'currency' => config('cashier.currency'),
            'currencyLocale' => config('cashier.currency_locale'),
            'env' => config('app.env'),
            'roles' => Spark::roles(),
            'state' => Spark::call(InitialFrontendState::class.'@forUser', [Auth::user()]),
            'stripeApiVersion' => Cashier::STRIPE_VERSION,
            'stripeKey' => config('cashier.key'),
            'cashierPath' => config('cashier.path'),
            'teamsPrefix' => Spark::teamsPrefix(),
            'teamsIdentifiedByPath' => Spark::teamsIdentifiedByPath(),
            'userId' => Auth::id(),
            'usesApi' => Spark::usesApi(),
            'usesTeams' => Spark::usesTeams(),
            'usesStripe' => Spark::billsUsingStripe(),
            'chargesUsersPerSeat' => Spark::chargesUsersPerSeat(),
            'seatName' => Spark::seatName(),
            'chargesTeamsPerSeat' => Spark::chargesTeamsPerSeat(),
            'teamSeatName' => Spark::teamSeatName(),
            'chargesUsersPerTeam' => Spark::chargesUsersPerTeam(),
            'chargesTeamsPerMember' => Spark::chargesTeamsPerMember(),
        ];
    }
}
